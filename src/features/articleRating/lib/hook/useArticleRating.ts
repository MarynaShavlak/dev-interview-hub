import { useCallback } from 'react';
import { useUserAuthData } from '@/entities/User';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';

/**
 * Custom hook for managing article ratings and feedback.
 * @param {string} articleId - The unique identifier of the article for which the rating is managed.
 *
 * @returns {{
 *    rating: object | undefined;
 *    isLoading: boolean;
 *    error: object | null;
 *    onSubmitFeedback: (starsCount: number, feedback?: string) => void;
 *    onSubmitRating: (starsCount: number) => void;
 *  }} An object with the following properties:
 *  * `rating`: The current rating data for the article, or `undefined` if not yet loaded.
 *  * `isLoading`: Boolean indicating whether the rating data is currently being fetched.
 *  * `error`: An error object if an error occurred while fetching the rating data, or `null` otherwise.
 *  * `onSubmitFeedback`: Function to handle the submission of a rating along with feedback.
 *  * `onSubmitRating`: Function to handle the submission of a rating without feedback.
 *
 *
 * */

export const useArticleRating = (articleId: string) => {
    const userData = useUserAuthData();
    const { data, isLoading, error } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onSubmitFeedback = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const onSubmitRating = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    return {
        rating: data?.[0],
        isLoading,
        error,
        onSubmitFeedback,
        onSubmitRating,
    };
};
