// useStatisticsData.ts
import { useSelector } from 'react-redux';
import { useUsers } from '@/entities/User';

import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { useArticlesComments } from '@/features/ArticleComments';
import { getArticles, useArticles } from '@/entities/Article';

export const useStatisticsData = () => {
    const {
        data: users,
        isLoading: isUsersLoading,
        error: isUsersError,
    } = useUsers();
    const articles = useSelector(getArticles.selectAll);
    const {
        // data: articles,
        isLoading: isArticlesLoading,
        error: isArticlesError,
    } = useArticles();
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

    const isLoading =
        isUsersLoading ||
        isArticlesLoading ||
        isRatingsLoading ||
        isCommentsLoading;

    const isError =
        isUsersError || isArticlesError || isRatingsError || isCommentsError;

    return { users, articles, ratings, comments, isLoading, isError };
};
