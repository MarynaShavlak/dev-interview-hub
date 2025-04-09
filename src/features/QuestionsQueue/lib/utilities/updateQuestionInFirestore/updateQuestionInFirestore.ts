import { getDoc, updateDoc } from 'firebase/firestore';

import { ERROR_QUESTION_MESSAGES } from '../../../model/consts/errorQuestionMessages';
import { Question } from '@/entities/Question';
import { getQuestionDocRefById } from '../getQuestionDocRefById/getQuestionDocRefById';

export const updateQuestionInFirestore = async (
    questionId: string,
    updates: Partial<Question>,
) => {
    const questionDocRef = await getQuestionDocRefById(questionId);
    if (!questionDocRef) {
        throw new Error(ERROR_QUESTION_MESSAGES.QUESTION_NOT_FOUND(questionId));
    }

    await updateDoc(questionDocRef, updates);
    const updatedDoc = await getDoc(questionDocRef);
    const updatedData = updatedDoc.data();
    if (!updatedData) {
        throw new Error(
            ERROR_QUESTION_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(questionId),
        );
    }

    return updatedData as Question;
};
