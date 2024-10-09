import { useTranslation } from 'react-i18next';
import React from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { UsersActivityChartProps } from '../UsersActivityChart';

export const RedesignedUsersActivityChart = (
    props: UsersActivityChartProps,
) => {
    const { t } = useTranslation('admin');
    const { activeUsersData } = props;
    const activeUserLabels = [
        `${t('Автори статей')}`,
        `${t('Коментатори статей')}`,
        `${t('Оцінка статей')}`,
    ];

    return (
        <Card>
            <RadialbarChart
                data={activeUsersData}
                labels={activeUserLabels}
                title={t('Відсоток активних користувачів, %')}
                legendPosition="top"
                height="200"
                width="380"
                totalLabel={t('Загальний відсоток')}
            />
        </Card>
    );
};
