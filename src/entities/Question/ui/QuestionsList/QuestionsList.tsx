import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { VStack } from '@/shared/ui/common/Stack';

import { ARTICLE_TO_CREATE_TITLE } from '@/shared/const/localstorage';
import { QuestionCard } from '../QuestionCard/QuestionCard';

export const QuestionsList = memo(() => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation('articles');

    const handleDeleteClick = () => {
        console.log('deleteClick');
    };
    const handleEditClick = (title: string) => {
        console.log('editClick', title);
        sessionStorage.setItem(ARTICLE_TO_CREATE_TITLE, title);
    };

    return (
        <VStack gap="24" max>
            <QuestionCard
                text="5555555555555"
                index={1}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
            />
            <QuestionCard
                text="6666666666666"
                index={2}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
            />
        </VStack>
    );
});
