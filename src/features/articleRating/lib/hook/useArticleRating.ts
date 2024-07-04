import { useCallback } from 'react';
import { useUserAuthData } from '@/entities/User';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';

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

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    return {
        rating: data?.[0],
        isLoading,
        error,
        onAccept,
        onCancel,
    };
};
