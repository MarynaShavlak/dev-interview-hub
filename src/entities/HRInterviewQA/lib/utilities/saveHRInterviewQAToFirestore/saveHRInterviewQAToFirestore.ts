import { getDoc } from 'firebase/firestore';

import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { HRInterviewQA } from '../../../model/types/hrInterviewQA';
import { ERROR_HR_INTERVIEW_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';

export type NewHRInterviewQADraft = Omit<HRInterviewQA, 'createdAt'>;

export const saveHRInterviewQAToFirestore = async (
    newHRInterviewQA: NewHRInterviewQADraft,
) => {
    const HRInterviewQAWithTimestamp = {
        ...newHRInterviewQA,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<HRInterviewQA>(
        'hrInterviewQA',
        HRInterviewQAWithTimestamp,
    );

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(
            ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_RETRIEVAL_FAIL,
        );
    }

    return createdDocSnapshot.data() as HRInterviewQA;
};
