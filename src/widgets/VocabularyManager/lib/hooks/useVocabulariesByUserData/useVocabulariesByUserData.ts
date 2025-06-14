import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

import { useUserAuthData } from '@/entities/User';

import { useVocabularyByUser } from '../../../api/vocabularyManagerApi';
import { Vocabulary } from '@/entities/Vocabulary';

export const useVocabulariesByUserData = () => {
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';
    const { data, isLoading, error } = useVocabularyByUser(authedUserId);

    if (!data) return { data: null, isLoading, isError: Boolean(error) };

    const modifiedData: Vocabulary[] = data.map(({ createdAt, ...props }) => {
        return {
            ...props,
            createdAt: formatDateString(createdAt),
        };
    });

    if (!modifiedData)
        return { data: null, isLoading, isError: Boolean(error) };
    return {
        data: modifiedData,
        isLoading,
        isError: Boolean(error),
    };
};
