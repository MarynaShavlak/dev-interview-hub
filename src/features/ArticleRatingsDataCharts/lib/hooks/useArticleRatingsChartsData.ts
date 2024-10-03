import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { ArticleRating } from '../../model/types/articleRating';
import { useArticles } from '@/entities/Article';

interface DataObj {
    [key: string]: {
        totalRating: number;
        articlesWithRating: number;
        articlesWithFeedback: number;
    };
}

export interface Data {
    [key: string]: number;
}

const countRatings = (ratings: ArticleRating[]) => {
    const articleRatingsCount: DataObj = {};
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

    return {
        articleRatingsCount,
    };
};

export const useArticleRatingsChartsData = () => {
    const { t } = useTranslation('admin');
    const { data: ratings = [], isLoading } = useArticlesRatings(null);
    const { data: articles } = useArticles(null);
    const totalArticles = articles?.length || 1;

    const { articleRatingsCount } = useMemo(
        () => countRatings(ratings),
        [ratings],
    );

    const articleRatingsByUsersData = Object.keys(articleRatingsCount).map(
        (userId) => {
            const userData = articleRatingsCount[userId];

            const ratedArticles = userData.articlesWithRating;
            console.log('ratedArticles', ratedArticles);
            const averageRating = (
                userData.totalRating / userData.articlesWithRating
            ).toFixed(1);
            const percentageRated = (ratedArticles / totalArticles) * 100;
            const writtenFeedbacksQuantity = userData.articlesWithFeedback;
            // console.log('percentageRated', percentageRated);
            return {
                name: `${t(`userId`)}:  ${userId} `,
                data: [
                    [
                        percentageRated,
                        parseFloat(averageRating),

                        writtenFeedbacksQuantity,
                    ],
                ],
            };
        },
    );

    console.log('articleRatingsByUsersData', articleRatingsByUsersData);

    return {
        articleRatingsByUsersData,
    };
};
