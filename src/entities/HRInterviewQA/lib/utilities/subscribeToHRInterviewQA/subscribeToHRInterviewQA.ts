import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';

import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { HRInterviewQA } from '../../../model/types/hrInterviewQA';
import { ERROR_HR_INTERVIEW_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';
import { createHRInterviewQAQuery } from '../createHRInterviewQAQuery/createHRInterviewQAQuery';

export const subscribeToHRInterviewQA = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<HRInterviewQA>) => void,
    ) => void,
    id: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!id) return undefined;
        const query = createHRInterviewQAQuery(id);

        unsubscribe = onSnapshot(query, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as HRInterviewQA[];
                return result[0];
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_SNAPSHOT_FAIL(id),
            error,
        );
    }

    return unsubscribe;
};
