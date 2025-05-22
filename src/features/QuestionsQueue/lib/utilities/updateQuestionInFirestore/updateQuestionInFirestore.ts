import { getDoc, updateDoc } from 'firebase/firestore';

import { ERROR_QUESTION_MESSAGES } from '../../../model/consts/errorQuestionMessages';
import { Question } from '@/entities/Question';
import { getQuestionDocRefById } from '../getQuestionDocRefById/getQuestionDocRefById';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export const updateQuestionInFirestore = async (
    questionId: string,
    updates: Partial<Question>,
) => {
    const questionDocRef = await getQuestionDocRefById(questionId);
    assertExists(
        questionDocRef,
        ERROR_QUESTION_MESSAGES.QUESTION_NOT_FOUND(questionId),
    );

    await updateDoc(questionDocRef, updates);
    const updatedDoc = await getDoc(questionDocRef);
    const updatedData = updatedDoc.data();
    assertExists(
        updatedData,
        ERROR_QUESTION_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(questionId),
    );

    return updatedData as Question;
};
