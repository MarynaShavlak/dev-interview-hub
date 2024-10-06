import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { ArticleRating } from '../../model/types/articleRating';
import { useArticles } from '@/entities/Article';

interface UserRatingData {
    totalRating: number;
    articlesWithRating: number;
    articlesWithFeedback: number;
}

interface RatingsCount {
    [key: string]: UserRatingData;
}

interface ArticleRatingsData {
    articleRatingsCount: RatingsCount;
}

const countRatings = (ratings: ArticleRating[]): ArticleRatingsData => {
    const articleRatingsCount: RatingsCount = {};

    ratings.forEach(({ userId, rate, feedback }) => {
        if (!articleRatingsCount[userId]) {
            articleRatingsCount[userId] = {
                totalRating: 0,
                articlesWithRating: 0,
                articlesWithFeedback: 0,
            };
        }
        articleRatingsCount[userId].totalRating += rate;
        articleRatingsCount[userId].articlesWithRating += 1;
        if (feedback) {
            articleRatingsCount[userId].articlesWithFeedback += 1;
        }
    });
    console.log('articleRatingsCount', articleRatingsCount);

    return { articleRatingsCount };
};

export const useArticleRatingsCharts = () => {
    const { t } = useTranslation('admin');
    const { data: ratings = [] } = useArticlesRatings(null);
    const { data: articles } = useArticles(null);
    const totalArticles = articles?.length;

    const { articleRatingsCount } = useMemo(
        () => countRatings(ratings),
        [ratings],
    );

    const { articleRatingsByUsersData, maxXaxisValue } = useMemo(() => {
        const percentageRatedValues: number[] = [];
        const ratingsData = Object.entries(articleRatingsCount).map(
            ([userId, userData]) => {
                const {
                    totalRating,
                    articlesWithRating,
                    articlesWithFeedback,
                } = userData;

                const averageRating = articlesWithRating
                    ? (totalRating / articlesWithRating).toFixed(1)
                    : '0.0';

                const percentageRated = totalArticles
                    ? (articlesWithRating / totalArticles) * 100
                    : 0;

                const formattedPercentageRated = parseFloat(
                    percentageRated.toFixed(1),
                );

                percentageRatedValues.push(formattedPercentageRated);

                return {
                    name: `${t(`userId`)}:  ${userId} `,
                    data: [
                        [
                            formattedPercentageRated,
                            parseFloat(averageRating),
                            articlesWithFeedback,
                        ],
                    ],
                };
            },
        );

        const maxXaxisValue = Math.max(...percentageRatedValues);

        return { articleRatingsByUsersData: ratingsData, maxXaxisValue };
    }, [articleRatingsCount, totalArticles, t]);

    return {
        articleRatingsByUsersData,
        maxXaxisValue: maxXaxisValue + 2,
    };
};
