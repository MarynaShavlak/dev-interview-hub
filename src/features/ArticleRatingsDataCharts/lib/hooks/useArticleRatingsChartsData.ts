import { useMemo } from 'react';
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
    const { data: ratings = [], isLoading } = useArticlesRatings(null);
    const { data: articles } = useArticles(null);

    const { articleRatingsCount } = useMemo(
        () => countRatings(ratings),
        [ratings],
    );

    // const articleRatingsByUsersData = Object.entries(articleRatingsCount).map(
    //     ([userId, data]) => {
    //         const averageRating = (
    //             data.totalRating / data.articlesWithRating
    //         ).toFixed(1);
    //         return [userId, parseFloat(averageRating), data.articlesWithRating];
    //     },
    // );

    // ______________________________________________________________________
    const { articlesByUsersCount } = useMemo(() => {
        const articlesByUsersCount: Data = {};

        articles?.forEach((article) => {
            const userId: string = article.user.id;
            articlesByUsersCount[userId] =
                (articlesByUsersCount[userId] || 0) + 1;
        });

        return { articlesByUsersCount };
    }, [articles]);

    // console.log('articlesByUsersCount', articlesByUsersCount);
    const articleRatingsByUsersData = Object.keys(articleRatingsCount).map(
        (userId) => {
            const userRatingData = articleRatingsCount[userId];
            const articlesCount = articlesByUsersCount[userId];
            const averageRating = (
                userRatingData.totalRating / userRatingData.articlesWithRating
            ).toFixed(1);

            return {
                name: `userId: ${userId}`,
                data: [
                    [
                        articlesCount,
                        parseFloat(averageRating),
                        userRatingData.articlesWithRating,
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
