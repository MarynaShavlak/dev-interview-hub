import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';

import { useGetArticleStats } from '../useGetArticlesStats/useGetArticlesStats';

export const useArticlesByUserData = () => {
    const { articles, isLoading, isError, stats } = useGetArticleStats();

    const combinedArticlesData: UserArticlesTableInfo[] = articles.map(
        ({ id, user, title, views, createdAt, category }) => {
            return {
                id,
                user,
                title,

                views,
                createdAt: formatDateString(createdAt),
                categories: category.join(', '),
                ...stats[id],
            };
        },
    );

    if (!combinedArticlesData) return { articles: [], isLoading, isError };

    return {
        articles: combinedArticlesData,
        isLoading,
        isError,
    };
};
