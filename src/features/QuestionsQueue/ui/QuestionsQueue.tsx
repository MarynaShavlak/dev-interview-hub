import React, { memo, useCallback } from 'react';

import { QuestionsList, AddQuestionForm } from '@/entities/Question';
import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addQuestionThunk } from '../model/services/addQuestionThunk/addQuestionThunk';
import { useQuestionsByUser } from '../api/questionsQueueApi';
import { useUserAuthData } from '@/entities/User';

import { deleteQuestionThunk } from '../model/services/deleteQuestionThunk/deleteQuestionThunk';

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

    const handleDeleteQuestion = async (questionId: string) => {
        try {
            const deletedQuestionId = await dispatch(
                deleteQuestionThunk(questionId),
            ).unwrap();

            return deletedQuestionId;
        } catch (error) {
            console.error('Error deleting question:', error);
            return null;
        }
    };

    return (
        <VStack gap="16" max>
            <AddQuestionForm onAddQuestion={onAddQuestion} />

            {error ? (
                <QuestionsList
                    isLoading={false}
                    questions={undefined}
                    error={error as string}
                    deleteQuestion={handleDeleteQuestion}
                />
            ) : (
                <QuestionsList
                    questions={questions}
                    isLoading={isLoading}
                    error={error as string}
                    deleteQuestion={handleDeleteQuestion}
                />
            )}
        </VStack>
    );
});
