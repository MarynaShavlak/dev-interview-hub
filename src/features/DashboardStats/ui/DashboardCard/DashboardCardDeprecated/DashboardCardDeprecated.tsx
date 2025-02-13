import React, { memo } from 'react';
import { Card } from '@/shared/ui/deprecated/Card';
import {
    Text,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import cls from '../DashboardCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DashboardCardProps } from '../../../model/types/types';

import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack } from '@/shared/ui/common/Stack';

export const DashboardCardDeprecated = memo((props: DashboardCardProps) => {
    const { title, value, Icon: svg } = props;
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    const cardClass = classNames(cls.dashboardCard, {}, additionalClasses);
    return (
        <Card className={cardClass}>
            <Text
                text={title}
                className={cls.dashboardCardLabel}
                size={TextSize.S}
            />
            {svg ? (
                <HStack justify="between">
                    <Icon Svg={svg} width={30} height={30} />
                    <Text
                        className={cls.dashboardValue}
                        text={value}
                        size={TextSize.L}
                        align={TextAlign.RIGHT}
                        theme={TextTheme.PRIMARY}
                    />
                </HStack>
            ) : (
                <Text
                    className={cls.dashboardValue}
                    text={value}
                    size={TextSize.L}
                    align={TextAlign.RIGHT}
                    theme={TextTheme.PRIMARY}
                />
            )}
        </Card>
    );
});
