// DashboardCard.tsx
import React, { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import cls from './DashboardCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { DashboardCardProps } from '../../model/types/types';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

export const DashboardCard = memo((props: DashboardCardProps) => {
    const { title, value } = props;
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    const cardClass = classNames(cls.dashboardCard, {}, additionalClasses);
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card className={cardClass}>
                    <Text
                        bold
                        text={title}
                        className={cls.dashboardCardLabel}
                    />
                    <Text
                        bold
                        text={value}
                        size="l"
                        align="right"
                        variant="accent"
                    />
                </Card>
            }
            off={
                <CardDeprecated className={cardClass}>
                    <TextDeprecated
                        text={title}
                        className={cls.dashboardCardLabel}
                    />
                    <TextDeprecated
                        className={cls.dashboardValue}
                        text={value}
                        size={TextSize.L}
                        align={TextAlign.RIGHT}
                        theme={TextTheme.PRIMARY}
                    />
                </CardDeprecated>
            }
        />
    );
});
