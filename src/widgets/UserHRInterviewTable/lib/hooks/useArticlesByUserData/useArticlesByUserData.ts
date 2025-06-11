import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

import { useUserAuthData } from '@/entities/User';
import {
    HRInterviewQA,
    useHRInterviewQADataByUserId,
} from '@/entities/HRInterviewQA';

export const useArticlesByUserData = () => {
    const currentUserdata = useUserAuthData();

    const authedUserId = currentUserdata?.id || '';

    const {
        data: articles,
        isLoading,
        error,
    } = useHRInterviewQADataByUserId(authedUserId);

    if (!articles)
        return { articles: null, isLoading, isError: Boolean(error) };

    const combinedArticlesData: HRInterviewQA[] = articles.map(
        ({ id, user, title, createdAt, category }) => {
            return {
                id,
                user,
                title,
                category,
                createdAt: formatDateString(createdAt),
            };
        },
    );

    if (!combinedArticlesData) return { articles: null, isLoading, isError };
    return {
        articles: combinedArticlesData,
        isLoading,
        isError,
    };
};
