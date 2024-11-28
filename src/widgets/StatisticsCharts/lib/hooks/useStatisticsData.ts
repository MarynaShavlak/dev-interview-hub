// useStatisticsData.ts
import { useUsers } from '@/entities/User';
import { useArticles } from '@/entities/Article';
import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { useArticlesComments } from '../../api/articlesCommentsApi';

export const useStatisticsData = () => {
    const {
        data: users,
        isLoading: isUsersLoading,
        error: isUsersError,
    } = useUsers();
    const {
        data: articles,
        isLoading: isArticlesLoading,
        error: isArticlesError,
    } = useArticles({});
    const {
        data: ratings = [],
        isLoading: isRatingsLoading,
        error: isRatingsError,
    } = useArticlesRatings();
    const {
        data: comments = [],
        isLoading: isCommentsLoading,
        error: isCommentsError,
    } = useArticlesComments();

    console.log('ratings', ratings);

    const isLoading =
        isUsersLoading ||
        isArticlesLoading ||
        isRatingsLoading ||
        isCommentsLoading;

    const isError =
        isUsersError || isArticlesError || isRatingsError || isCommentsError;

    return { users, articles, ratings, comments, isLoading, isError };
};
