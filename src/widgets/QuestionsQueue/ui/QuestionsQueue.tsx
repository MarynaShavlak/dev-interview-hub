import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { VStack } from '@/shared/ui/common/Stack';

import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { QuestionCard } from './QuestionCard/QuestionCard';

export const QuestionsQueue = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });
    const handleDeleteClick = () => {
        console.log('deleteClick');
    };
    const handleEditClick = () => {
        console.log('editClick');
    };

    return (
        <VStack gap="24" max>
            <QuestionCard
                text="5555555555555"
                index={1}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
            />
        </VStack>
    );
});
