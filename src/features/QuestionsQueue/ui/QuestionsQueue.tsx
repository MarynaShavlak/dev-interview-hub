import React, { memo, useCallback } from 'react';

import { QuestionsList, AddQuestionForm } from '@/entities/Question';
import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addQuestionThunk } from '../model/services/addQuestionThunk/addQuestionThunk';

export const QuestionsQueue = memo(() => {
    const dispatch = useAppDispatch();

    const onAddQuestion = useCallback(
        (text: string) => {
            dispatch(addQuestionThunk({ text }));
        },
        [dispatch],
    );

    return (
        <VStack gap="16" max>
            <AddQuestionForm onAddQuestion={onAddQuestion} />
            <QuestionsList />
        </VStack>
    );
});
