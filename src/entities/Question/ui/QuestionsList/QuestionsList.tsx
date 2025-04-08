import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { VStack } from '@/shared/ui/common/Stack';

import { ARTICLE_TO_CREATE_TITLE } from '@/shared/const/localstorage';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import { Question } from '../../model/types/question';
import { Each } from '@/shared/lib/components/Each/Each';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

interface QuestionsListProps {
    className?: string;
    questions?: Question[];
    isLoading?: boolean;
    error?: string;
    deleteQuestion?: (questionId: string) => Promise<any>;
}

export const QuestionsList = memo((props: QuestionsListProps) => {
    const dispatch = useAppDispatch();
    const { deleteQuestion, error, isLoading, questions, className } = props;

    const { t } = useTranslation('articles');
    const noCommentsMessage = t('Доданих питань у черзі немає');

    const handleDeleteClick = () => {
        console.log('deleteClick');
    };
    const handleEditClick = (title: string) => {
        console.log('editClick', title);
        sessionStorage.setItem(ARTICLE_TO_CREATE_TITLE, title);
    };

    // if (isLoading) {
    //     return <QuestionListSkeleton className={className} />;
    // }
    // if (error) {
    //     return <QuestionListError className={className} />;
    // }

    return (
        <VStack gap="24" max>
            {questions?.length ? (
                <Each
                    of={questions}
                    render={(item, index) => (
                        <QuestionCard
                            key={item.id}
                            text={item.text}
                            index={index + 1}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                        />
                    )}
                />
            ) : (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={noCommentsMessage} />}
                    off={<TextDeprecated text={noCommentsMessage} />}
                />
            )}
        </VStack>
    );
});
