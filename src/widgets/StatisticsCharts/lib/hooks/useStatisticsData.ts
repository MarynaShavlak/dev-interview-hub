// useStatisticsData.ts

import { useSelector } from 'react-redux';
import { useUsers } from '@/entities/User';

import { useArticlesComments } from '@/features/ArticleComments';
import { selectAllArticles, useGetArticles } from '@/entities/Article';
import { useArticlesRatings } from '@/features/ArticleRating';

export const useStatisticsData = () => {
    const {
        data: users,
        isLoading: isUsersLoading,
        error: isUsersError,
    } = useUsers();
    const { isLoading: isArticlesLoading, error: isArticlesError } =
        useGetArticles();
    const articles = useSelector(selectAllArticles);

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
