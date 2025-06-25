import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

import { useUserAuthData } from '@/entities/User';
import {
    HRCategory,
    HRInterviewQA,
    useHRCategoryTabs,
    useHRInterviewQAsByUserId,
} from '@/entities/HRInterviewQA';

export const useHRInterviewQAsByUserData = () => {
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';
    const { data, isLoading, error } = useHRInterviewQAsByUserId(authedUserId);
    const tabs = useHRCategoryTabs();

    if (!data) return { data: null, isLoading, isError: Boolean(error) };

    const modifiedData: HRInterviewQA[] = data.map(
        ({ createdAt, category, ...props }) => {
            const label =
                tabs.find((tab) => tab.value === category)?.label || category;
            return {
                ...props,
                category: label as HRCategory,
                createdAt: formatDateString(createdAt),
            };
        },
    );

    if (!modifiedData)
        return { data: null, isLoading, isError: Boolean(error) };
    return {
        data: modifiedData,
        isLoading,
        isError: Boolean(error),
    };
};
