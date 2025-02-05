import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useUsers } from '@/entities/User';
import { Article, selectAllArticles, useGetArticles } from '@/entities/Article';

interface UserStats {
    articlesQuantity: number;
}

interface UseUserStatsResult {
    stats: Record<string, UserStats>;
    isLoading: boolean;
    isError: boolean;
    articles: Article[];
}

export const useGetUserStats = () => {
    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useUsers();
    const {
        isLoading: isArticlesLoading,
        isError: isArticlesError,
        // data: articles = [],
    } = useGetArticles();
    const isLoading = isUsersLoading || isArticlesLoading;
    const isError = isUsersError || isArticlesError;
    const articles = useSelector(selectAllArticles);
    const usersIdArray = users?.map((user) => user.id);

    const stats = useMemo(() => {
        const userStats: Record<string, UserStats> = {};

        usersIdArray.forEach((userId) => {
            const userArticles = articles.filter(
                (article) => article.user.id === userId,
            );

            userStats[userId] = {
                articlesQuantity: userArticles.length,
            };
        });

        return userStats;
    }, [articles, usersIdArray]);

    return {
        stats,
        users,
        isLoading,
        isError,
    };
};
