import { getDoc, updateDoc } from 'firebase/firestore';

import { getHRInterviewQADocRefById } from '../getHRInterviewQADocRefById/getHRInterviewQADocRefById';
import { HRInterviewQA } from '../../../model/types/hrInterviewQA';
import { ERROR_HR_INTERVIEW_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';

export const updateHRInterviewQAInFirestore = async (
    id: string,
    updates: Partial<HRInterviewQA>,
) => {
    const articleDocRef = await getHRInterviewQADocRefById(id);
    if (!articleDocRef) {
        throw new Error(ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEW_NOT_FOUND(id));
    }

    await updateDoc(articleDocRef, updates);
    const updatedDoc = await getDoc(articleDocRef);
    const updatedData = updatedDoc.data();
    if (!updatedData) {
        throw new Error(
            ERROR_HR_INTERVIEW_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(id),
        );
    }

    return updatedData as HRInterviewQA;
};
