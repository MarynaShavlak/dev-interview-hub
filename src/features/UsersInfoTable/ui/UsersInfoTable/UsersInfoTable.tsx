import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/DonutChart/DonutChart';
import { Table } from '@/shared/ui/common/Table';

export const UsersInfoTable = () => {
    const { users, isLoading } = useUsersFullData();
    const { t } = useTranslation('admin');

    const columns = generateTableColumnsData(users, t);
    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Skeleton width="100%" height={400} />}
                off={<SkeletonDeprecated width="100%" height={400} />}
            />
        );
    }
    const d = [...users, ...users, ...users];
    const c = generateTableColumnsData(d, t);
    const series = [44, 55, 13, 43, 22];
    const labels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];

    const series1 = [56, 10, 6, 13, 60];
    const labels1 = [' A', ' B', ' C', 'D', ' E'];
    const theme1 = 'light';
    const theme2 = 'dark';

    return (
        <VStack gap="24">
            <HStack gap="24">
                <DonutChart
                    data={series}
                    labels={labels}
                    title={t('Категорії статей, %')}
                />
                <DonutChart
                    data={series1}
                    labels={labels1}
                    title={t('Категорії статей, %')}
                />
            </HStack>

            <Table data={d} columns={c} />
        </VStack>
    );
};
