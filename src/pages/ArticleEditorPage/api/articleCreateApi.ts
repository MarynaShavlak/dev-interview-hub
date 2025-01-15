import { getDoc } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';

import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { Article } from '@/entities/Article';

export const articleCreateFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Articles'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            addArticle: build.mutation<Article, Article>({
                invalidatesTags: [{ type: 'Articles', id: 'articleId' }],
                async queryFn(newArticle) {
                    try {
                        const docRef = await addDocToFirestore<Article>(
                            'articles',
                            newArticle,
                        );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created article.',
                            );
                        }

                        return {
                            data: {
                                ...createdDocSnapshot.data(),
                            } as Article,
                        };
                    } catch (error) {
                        console.error('Error adding new article:', error);
                        return { error };
                    }
                },
            }),
        }),
    });

export const addArticleMutation =
    articleCreateFirebaseApi.endpoints.addArticle.initiate;
