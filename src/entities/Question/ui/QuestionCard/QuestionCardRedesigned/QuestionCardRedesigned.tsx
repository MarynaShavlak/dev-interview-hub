import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import { HStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Text } from '@/shared/ui/redesigned/Text';

import { Card } from '@/shared/ui/redesigned/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { QuestionCardProps } from '../QuestionCard';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { EditQuestionForm } from '../../EditQuestionForm/EditQuestionForm';
import { useQuestionCard } from '../../../lib/hook/useQuestionCard/useQuestionCard';

export const QuestionCardRedesigned = memo((props: QuestionCardProps) => {
    const {
        question,
        createArticle,
        deleteQuestion,
        updateQuestion,
        target,
        index,
    } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });
    const {
        isEditing,
        handleEdit,
        handleDeleteClick,
        handleCancelEditing,
        handleSave,
        handleCreateArticle,
    } = useQuestionCard({
        question,
        deleteQuestion,
        updateQuestion,
        createArticle,
    });

    return (
        <Card
            border="partial"
            padding="24"
            className={classNames('', {}, [...additionalClasses])}
            max
        >
            {isEditing ? (
                <HStack justify="between" max>
                    <HStack gap="24" max>
                        <OrderCard index={index} />
                        <EditQuestionForm
                            question={question}
                            onCancel={handleCancelEditing}
                            onSave={handleSave}
                        />
                    </HStack>
                </HStack>
            ) : (
                <HStack justify="between" max>
                    <HStack gap="24">
                        <OrderCard index={index} />
                        <Text text={question.text} size="m" withTags />
                    </HStack>

                    <HStack justify="center" gap="8">
                        <AddNewEntityButton
                            onClick={handleCreateArticle}
                            entityType="article"
                        />
                        <Icon
                            Svg={EditIcon}
                            width={18}
                            clickable
                            onClick={handleEdit}
                        />
                        <Icon
                            Svg={DeleteIcon}
                            width={18}
                            variant="error"
                            clickable
                            onClick={handleDeleteClick}
                        />
                    </HStack>
                </HStack>
            )}
        </Card>
    );
});
