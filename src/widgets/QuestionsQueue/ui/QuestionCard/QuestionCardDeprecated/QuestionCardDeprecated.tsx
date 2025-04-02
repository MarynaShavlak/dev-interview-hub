import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Text, TextSize } from '@/shared/ui/deprecated/Text';

import { Card } from '@/shared/ui/deprecated/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { QuestionCardProps } from '../QuestionCard';
import { Icon } from '@/shared/ui/deprecated/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

export const QuestionCardDeprecated = memo((props: QuestionCardProps) => {
    const { text, handleEditClick, handleDeleteClick, target, index } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    return (
        <Card
            padding="24"
            className={classNames('', {}, [...additionalClasses])}
            max
        >
            <HStack justify="between" max>
                <HStack gap="24">
                    <OrderCard index={index} />
                    <Text text={text} size={TextSize.M} withTags />
                </HStack>

                <HStack justify="center" gap="8">
                    {/* <Icon */}
                    {/*    Svg={EditIcon} */}
                    {/*    width={18} */}
                    {/*    clickable */}
                    {/*    onClick={handleEditClick} */}
                    {/* /> */}
                    <Button
                        className={classNames('', {}, additionalClasses)}
                        theme={ButtonTheme.CLEAR}
                        onClick={handleDeleteClick}
                    >
                        <Icon Svg={DeleteIcon} width={18} variant="error" />
                    </Button>
                </HStack>
            </HStack>
        </Card>
    );
});
