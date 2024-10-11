import { useTranslation } from 'react-i18next';
import React from 'react';
import { Card } from '@/shared/ui/deprecated/Card';
import { RadialbarChart } from '@/shared/ui/common/Charts/ui/RadialbarChart';
import { UsersActivityChartProps } from '../../../model/types/types';
import { useActiveUsersChartData } from '../../../lib/hooks/useActiveUsersChartData';

export const DeprecatedUsersActivityChart = (
    props: UsersActivityChartProps,
) => {
    const { t } = useTranslation('admin');
    const { activeUsersList, totalUsers } = props;
    const activeUsersData = useActiveUsersChartData(
        activeUsersList,
        totalUsers,
    );
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
