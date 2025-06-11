import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/common/Stack';

import { QuestionCard } from '../QuestionCard/QuestionCard';
import { Question } from '../../model/types/question';
import { Each } from '@/shared/lib/components/Each/Each';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { QuestionsListError } from './QuestionsListError/QuestionsListError';
import { QuestionsListSkeleton } from './QuestionCardSkeleton/QuestionsListSkeleton';
import { EntityType } from '@/shared/types/entityType';

interface QuestionsListProps {
    className?: string;
    questions?: Question[];
    isLoading?: boolean;
    error?: string;
    deleteQuestion: (questionId: string) => Promise<any>;
    updateQuestion: (updatedQuestion: Question) => Promise<any>;
    createEntity: (updatedQuestion: Question) => Promise<any>;
    type: EntityType;
}

export const QuestionsList = memo((props: QuestionsListProps) => {
    const {
        deleteQuestion,
        updateQuestion,
        createEntity,
        error,
        isLoading,
        questions,
        className,
        type,
    } = props;

    const { t } = useTranslation('articles');
    const noCommentsMessage = t('Доданих питань у черзі немає');

    if (isLoading) {
        return <QuestionsListSkeleton />;
    }
    if (error) {
        return <QuestionsListError className={className} />;
    }

    return (
        <VStack gap="24" max align="center">
            {questions?.length ? (
                <Each
                    of={questions}
                    render={(item, index) => (
                        <QuestionCard
                            key={item.id}
                            type={type}
                            question={item}
                            index={index + 1}
                            deleteQuestion={deleteQuestion}
                            updateQuestion={updateQuestion}
                            createEntity={createEntity}
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
