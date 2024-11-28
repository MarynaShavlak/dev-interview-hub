import { getDoc } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';

import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { ArticleComment } from '../model/types/articleComment';
import { getAllDocRefsByField } from '@/shared/lib/firestore/getAllDocRefsByField/getAllDocRefsByField';
import { fetchAllDocumentsByRefs } from '@/shared/lib/firestore/fetchAllDocumentsByRefs/fetchAllDocumentsByRefs';
import { User } from '@/entities/User';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';

export const articlesCommentsFirebaseApi = firestoreApi.injectEndpoints({
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
        }),
        getCommentsByArticleId: build.query<ArticleComment[], string>({
            async queryFn(articleId) {
                try {
                    const commentsByArticleRefs =
                        await getAllDocRefsByField<ArticleComment>(
                            'comments',
                            'articleId',
                            articleId,
                        );

                    const comments =
                        await fetchAllDocumentsByRefs<ArticleComment>(
                            commentsByArticleRefs,
                        );
                    return { data: comments };
                } catch (error) {
                    return { error };
                }
            },
        }),
        addComment: build.mutation<
            ArticleComment,
            { articleId: string; user: User; text: string; id: string }
        >({
            async queryFn(newComment) {
                try {
                    const docRef = await addDocToFirestore<ArticleComment>(
                        'comments',
                        { ...newComment, createdAt: new Date().toISOString() },
                    );

                    const createdDocSnapshot = await getDoc(docRef);

                    if (!createdDocSnapshot.exists()) {
                        throw new Error('Failed to retrieve created comment.');
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
