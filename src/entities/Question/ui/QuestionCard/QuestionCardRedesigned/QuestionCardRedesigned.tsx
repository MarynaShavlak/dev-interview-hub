import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AddNewArticleButton } from '@/shared/ui/common/AddNewArticleButton';
import { HStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Text } from '@/shared/ui/redesigned/Text';

import { Card } from '@/shared/ui/redesigned/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { QuestionCardProps } from '../QuestionCard';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';

export const QuestionCardRedesigned = memo((props: QuestionCardProps) => {
    const { text, handleEditClick, handleDeleteClick, target, index } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    return (
        <Card
            border="partial"
            padding="24"
            className={classNames('', {}, [...additionalClasses])}
            max
        >
            <HStack justify="between" max>
                <HStack gap="24">
                    <OrderCard index={index} />
                    <Text text={text} size="m" withTags />
                </HStack>

                <HStack justify="center" gap="8">
                    <AddNewArticleButton
                        onClick={() => handleEditClick(text)}
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
        </Card>
    );
});
