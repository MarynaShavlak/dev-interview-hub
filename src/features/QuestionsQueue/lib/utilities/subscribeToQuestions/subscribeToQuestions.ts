import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_QUESTION_MESSAGES } from '../../../model/consts/errorQuestionMessages';
import { Question } from '@/entities/Question';
import { createQuestionsQuery } from '../createQuestionsQuery/createQuestionsQuery';

export const subscribeToQuestions = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<Question[]>) => void,
    ) => void,
    userId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!userId) return undefined;
        const questionsQuery = createQuestionsQuery(userId);

        unsubscribe = onSnapshot(questionsQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as Question[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_QUESTION_MESSAGES.QUESTIONS_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
