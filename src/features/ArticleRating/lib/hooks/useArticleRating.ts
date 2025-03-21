import { useCallback } from 'react';
import { rateArticleThunk } from '../../model/services/rateArticleThunk/rateArticleThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

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
    const dispatch = useAppDispatch();

    const handleRateArticle = useCallback(
        async (starsCount: number, feedback?: string) => {
            const createdRating = await dispatch(
                rateArticleThunk({ rate: starsCount, feedback, articleId }),
            );
            return createdRating;
        },
        [articleId, dispatch],
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
        onSubmitFeedback,
        onSubmitRating,
    };
};
