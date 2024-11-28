import { getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';

import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { ArticleComment } from '../model/types/articleComment';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const articlesCommentsFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['Comments'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticlesComments: build.query<ArticleComment[], void>({
                async queryFn() {
                    try {
                        const comments =
                            await fetchCollection<ArticleComment>('comments');
                        return { data: comments };
                    } catch (error) {
                        console.error('Error fetching comments:', error);
                        return { error };
                    }
                },
                providesTags: ['Comments'],
            }),
            getCommentsByArticleId: build.query<ArticleComment[], string>({
                async queryFn(articleId) {
                    try {
                        const commentsCollection =
                            dataPoint<ArticleComment>('comments');
                        console.log('commentsCollection', commentsCollection);
                        const commentsQuery = query(
                            commentsCollection,
                            where('articleId', '==', articleId),
                            orderBy('createdAt', 'desc'),
                        );

                        const querySnapshot = await getDocs(commentsQuery);
                        const comments: ArticleComment[] = [];

                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                comments.push({ ...doc.data() });
                            });

                            return { data: comments };
                        }
                        return {
                            error: {
                                name: 'NotFound',
                                message: 'Comments not found',
                            },
                        };
                    } catch (error) {
                        return { error };
                    }
                },
                providesTags: ['Comments'],
            }),
            addComment: build.mutation<
                ArticleComment,
                { articleId: string; user: User; text: string; id: string }
            >({
                async queryFn(newComment) {
                    try {
                        const docRef = await addDocToFirestore<ArticleComment>(
                            'comments',
                            {
                                ...newComment,
                                createdAt: new Date().toISOString(),
                            },
                        );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created comment.',
                            );
                        }

                        return {
                            data: {
                                ...createdDocSnapshot.data(),
                            } as ArticleComment,
                        };
                    } catch (error) {
                        console.error('Error adding new comment:', error);
                        return { error };
                    }
                },
                invalidatesTags: ['Comments'],
            }),
        }),
    });

export const useArticlesComments =
    articlesCommentsFirebaseApi.useGetArticlesCommentsQuery;

export const getCommentsByArticleIdQuery =
    articlesCommentsFirebaseApi.endpoints.getCommentsByArticleId.initiate;
export const useCommentsByArticleId =
    articlesCommentsFirebaseApi.useGetCommentsByArticleIdQuery;

export const addCommentMutation =
    articlesCommentsFirebaseApi.endpoints.addComment.initiate;

// const commentsByArticleRefs =
//     await getAllDocRefsByField<ArticleComment>(
//         'comments',
//         'articleId',
//         articleId,
//     );
//
// const comments =
//     await fetchAllDocumentsByRefs<ArticleComment>(
//         commentsByArticleRefs,
//     );
// return { data: comments };
