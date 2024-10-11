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
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { HStack } from '@/shared/ui/common/Stack';

export const DashboardCard = memo((props: DashboardCardProps) => {
    const { title, value, Icon: svg } = props;
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    const cardClass = classNames(cls.dashboardCard, {}, additionalClasses);
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card className={cardClass} padding="16">
                    <Text
                        bold
                        text={title}
                        className={cls.dashboardCardLabel}
                    />

                    {svg ? (
                        <HStack justify="between">
                            <Icon Svg={svg} width={50} height={50} />
                            <Text
                                bold
                                text={value}
                                size="l"
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
            }
            off={
                <CardDeprecated className={cardClass}>
                    <TextDeprecated
                        text={title}
                        className={cls.dashboardCardLabel}
                    />
                    {svg ? (
                        <HStack justify="between">
                            <IconDeprecated Svg={svg} width={40} height={40} />
                            <TextDeprecated
                                className={cls.dashboardValue}
                                text={value}
                                size={TextSize.L}
                                align={TextAlign.RIGHT}
                                theme={TextTheme.PRIMARY}
                            />
                        </HStack>
                    ) : (
                        <TextDeprecated
                            className={cls.dashboardValue}
                            text={value}
                            size={TextSize.L}
                            align={TextAlign.RIGHT}
                            theme={TextTheme.PRIMARY}
                        />
                    )}
                </CardDeprecated>
            }
        />
    );
});
