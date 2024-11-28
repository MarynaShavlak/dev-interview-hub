import { ArticleComment } from '../model/types/articleComment';
import { firestoreApi } from '@/shared/api/rtkApi';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';

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
    }),
});

export const useArticlesComments =
    articlesCommentsFirebaseApi.useGetArticlesCommentsQuery;
