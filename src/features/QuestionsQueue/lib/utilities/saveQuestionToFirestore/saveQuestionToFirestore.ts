import { getDoc } from 'firebase/firestore';

import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { Question } from '@/entities/Question';
import { ERROR_QUESTION_MESSAGES } from '../../../model/consts/errorQuestionMessages';

export type NewQuestionDraft = Omit<Question, 'createdAt'>;

export const saveQuestionToFirestore = async (
    newQuestion: NewQuestionDraft,
) => {
    const questionWithTimestamp = {
        ...newQuestion,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<Question>(
        'questions',
        questionWithTimestamp,
    );

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(
            ERROR_QUESTION_MESSAGES.QUESTION_RETRIEVAL_FAIL,
        );
    }

    return createdDocSnapshot.data() as Question;
};
