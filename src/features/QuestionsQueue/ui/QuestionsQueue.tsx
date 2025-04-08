import React, { memo, useCallback } from 'react';

import { QuestionsList, AddQuestionForm } from '@/entities/Question';
import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addQuestionThunk } from '../model/services/addQuestionThunk/addQuestionThunk';
import { useQuestionsByUser } from '../api/questionsQueueApi';
import { useUserAuthData } from '@/entities/User';

export const QuestionsQueue = memo(() => {
    const dispatch = useAppDispatch();
    const user = useUserAuthData();

    const onAddQuestion = useCallback(
        (text: string) => {
            dispatch(addQuestionThunk({ text }));
        },
        [dispatch],
    );

    const {
        data: questions,
        isLoading,
        error,
    } = useQuestionsByUser(user?.id || '');

    return (
        <VStack gap="16" max>
            <AddQuestionForm onAddQuestion={onAddQuestion} />

            {error ? (
                <QuestionsList
                    isLoading={false}
                    questions={undefined}
                    error={error as string}
                />
            ) : (
                <QuestionsList
                    questions={questions}
                    isLoading={isLoading}
                    error={error as string}
                />
            )}
        </VStack>
    );
});
