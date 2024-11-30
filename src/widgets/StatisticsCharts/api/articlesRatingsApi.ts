import { ArticleRatingData } from '../../../features/ArticleRating/model/types/articleRatingData';
import { firestoreApi } from '@/shared/api/rtkApi';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';

export const articlesRatingFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRatings: build.query<ArticleRatingData[], void>({
            async queryFn() {
                try {
                    const ratings =
                        await fetchCollection<ArticleRatingData>('ratings');
                    return { data: ratings };
                } catch (error) {
                    console.error('Error fetching ratings:', error);
                    return { error };
                }
            },
        }),
    }),
});

export const useArticlesRatings =
    articlesRatingFirebaseApi.useGetArticlesRatingsQuery;
