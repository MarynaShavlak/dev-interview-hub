import { useMemo } from 'react';
import { useCommentsByArticleIdsList } from '@/features/ArticleComments';
import { useRatingsByArticleIdsList } from '@/features/ArticleRating';
import { useUserAuthData } from '@/entities/User';
import { Article, useArticlesByUserId } from '@/entities/Article';

interface ArticleStats {
    commentsQuantity: number;
    averageRating: number | '-';
}

interface UseArticleStatsResult {
    stats: Record<string, ArticleStats>;
    isLoading: boolean;
    isError: boolean;
    articles: Article[];
}

export const useGetArticleStats = (): UseArticleStatsResult => {
    const currentUserdata = useUserAuthData();

    const authedUserId = currentUserdata?.id || '';

    const {
        data: articles,
        isLoading: isArticlesLoading,
        error: isArticlesError,
    } = useArticlesByUserId(authedUserId);
    const articlesIdArray = useMemo(
        () => articles?.map((article) => article.id) || [],
        [articles],
    );

    const {
        data: ratings,
        isLoading: isRatingsLoading,
        error: isRatingsError,
    } = useRatingsByArticleIdsList(articlesIdArray || []);
    const {
        data: comments,
        isLoading: isCommentsLoading,
        error: isCommentsError,
    } = useCommentsByArticleIdsList(articlesIdArray || []);

    const isLoading =
        isArticlesLoading ||
        (articlesIdArray.length > 0 && (isRatingsLoading || isCommentsLoading));
    const isError = Boolean(
        isArticlesError || isRatingsError || isCommentsError,
    );

    const stats = useMemo(() => {
        const articleStats: Record<string, ArticleStats> = {};

        articlesIdArray?.forEach((articleId) => {
            const articleComments = comments?.filter(
                (comment) => comment.articleId === articleId,
            );

            const articleRatings = ratings?.filter(
                (rating) => rating.articleId === articleId,
            );

            const averageRating = articleRatings?.length
                ? Number(
                      (
                          articleRatings.reduce(
                              (acc, { rate }) => acc + rate,
                              0,
                          ) / articleRatings.length
                      ).toFixed(1),
                  )
                : '-';

            articleStats[articleId] = {
                commentsQuantity: articleComments?.length || 0,
                averageRating,
            };
        });

        return articleStats;
    }, [articlesIdArray, comments, ratings]);

    return {
        stats,
        articles: articles || [],
        isLoading,
        isError,
    };
};
