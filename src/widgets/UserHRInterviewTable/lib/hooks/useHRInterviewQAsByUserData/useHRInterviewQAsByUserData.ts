import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

import { useUserAuthData } from '@/entities/User';
import {
    HRInterviewQA,
    useHRInterviewQAsByUserId,
} from '@/entities/HRInterviewQA';

export const useHRInterviewQAsByUserData = () => {
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';
    const { data, isLoading, error } = useHRInterviewQAsByUserId(authedUserId);

    if (!data) return { data: null, isLoading, isError: Boolean(error) };

    const modifiedData: HRInterviewQA[] = data.map(
        ({ createdAt, ...props }) => {
            return {
                ...props,
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
