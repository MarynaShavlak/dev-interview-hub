// useStatisticsData.ts
import { useUsers } from '@/entities/User';
import { useArticles } from '@/entities/Article';
import { useArticlesRatings } from '../../../api/articlesRatingsApi';
import { useArticlesComments } from '../../../api/articlesCommentsApi';

export const useStatisticsData = () => {
    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);
    const { data: ratings = [], isLoading: isRatingsLoading } =
        useArticlesRatings(null);
    const { data: comments = [], isLoading: isCommentsLoading } =
        useArticlesComments(null);

    const isLoading =
        isUsersLoading ||
        isArticlesLoading ||
        isRatingsLoading ||
        isCommentsLoading;

    return { users, articles, ratings, comments, isLoading };
};
