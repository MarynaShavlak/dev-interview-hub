import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AddNewArticleButton } from '@/shared/ui/common/AddNewArticleButton';
import { HStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Text, TextSize } from '@/shared/ui/deprecated/Text';

import { Card } from '@/shared/ui/deprecated/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { QuestionCardProps } from '../QuestionCard';
import { Icon } from '@/shared/ui/deprecated/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useQuestionCard } from '../../../lib/hook/useQuestionCard/useQuestionCard';
import { EditQuestionForm } from '../../EditQuestionForm/EditQuestionForm';

export const QuestionCardDeprecated = memo((props: QuestionCardProps) => {
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
                        <Text text={question.text} size={TextSize.M} withTags />
                    </HStack>

                    <HStack justify="center" gap="8">
                        <AddNewArticleButton onClick={handleCreateArticle} />
                        <Button
                            className={classNames('', {}, additionalClasses)}
                            theme={ButtonTheme.CLEAR}
                            onClick={handleEdit}
                        >
                            <Icon Svg={EditIcon} width={18} variant="primary" />
                        </Button>
                        <Button
                            className={classNames('', {}, additionalClasses)}
                            theme={ButtonTheme.CLEAR}
                            onClick={handleDeleteClick}
                        >
                            <Icon Svg={DeleteIcon} width={18} variant="error" />
                        </Button>
                    </HStack>
                </HStack>
            )}
        </Card>
    );
});
