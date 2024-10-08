// DashboardCard.tsx
import React from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './DashboardCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface DashboardCardProps {
    title: string;
    value: string;
}

export const DashboardCard = (props: DashboardCardProps) => {
    const { title, value } = props;
    const additionalClasses = getFlexClasses({
        vStack: true,
        justify: 'between',
    });
    return (
        <Card className={classNames(cls.dashboardCard, {}, additionalClasses)}>
            <Text bold text={title} className={cls.dashboardCardLabel} />
            <Text bold text={value} size="l" align="right" variant="accent" />
        </Card>
    );
};
