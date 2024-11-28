import { getDocs, query } from 'firebase/firestore';
import { ArticleRating } from '../model/types/articleRating';
import { firestoreApi } from '@/shared/api/rtkApi';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const articlesRatingFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRatings: build.query<ArticleRating[], void>({
            async queryFn() {
                try {
                    const ratingsCollection =
                        dataPoint<ArticleRating>('ratings');
                    const queryRef = query(ratingsCollection);
                    const querySnapshot = await getDocs(queryRef);

                    if (!querySnapshot.empty) {
                        const ratings = querySnapshot.docs.map((doc) => ({
                            ...doc.data(),
                        }));

                        return { data: ratings };
                    }

                    return {
                        error: {
                            name: 'NotFound',
                            message: 'Ratings not found',
                        },
                    };
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
