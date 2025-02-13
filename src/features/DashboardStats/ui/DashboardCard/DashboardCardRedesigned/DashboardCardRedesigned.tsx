import React, { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from '../DashboardCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DashboardCardProps } from '../../../model/types/types';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/common/Stack';

export const DashboardCardRedesigned = memo((props: DashboardCardProps) => {
    const { title, value, Icon: svg } = props;
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    const cardClass = classNames(cls.dashboardCard, {}, additionalClasses);
    return (
        <Card className={cardClass} padding="16">
            <Text
                bold
                text={title}
                size="s"
                className={cls.dashboardCardLabel}
            />

            {svg ? (
                <HStack justify="between">
                    <Icon Svg={svg} width={30} height={30} />
                    <Text
                        bold
                        text={value}
                        size="m"
                        align="right"
                        variant="accent"
                    />
                </HStack>
            ) : (
                <Text
                    bold
                    text={value}
                    size="l"
                    align="right"
                    variant="accent"
                />
            )}
        </Card>
    );
});
