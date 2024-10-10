import { Article } from '@/entities/Article';
import { User } from '@/entities/User';
import { InitializedData } from '../../../model/types/stats';

export const initializeData = (
    articles?: Article[],
    users?: User[],
): InitializedData => {
    const totalArticles = articles?.length || 0;
    const totalUsers = users?.length || 0;
    return {
        totalArticles,
        totalUsers,
        averageRating: 0,
        averageViews: 0,
        categoryData: {},
        articleCommentCounts: [],
        commentCountsByArticle: {},
        commentCountsByUser: {},
        ratingCountsByUser: {},
        monthlyDataByCategories: {},
        activeUsersList: {
            inArticles: new Set(),
            inComments: new Set(),
            inRatings: new Set(),
        },
        activeArticlesList: {
            withRating: new Set(),
            withComments: new Set(),
            withFeedback: new Set(),
        },
        ratingDistributionMap: new Map<number, number>([
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
        ]),
    };
};
