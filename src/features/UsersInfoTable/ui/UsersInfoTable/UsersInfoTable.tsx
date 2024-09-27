import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';
import { Table } from '@/shared/ui/common/Table/Table';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/common/Stack';
import { PieChart } from '@/shared/ui/common/Charts/PieChart/PieChart';

export const UsersInfoTable = () => {
    const { users, isLoading } = useUsersFullData();
    const { t } = useTranslation('profile');

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

    return (
        <VStack>
            <PieChart />
            <Table data={d} columns={c} />
        </VStack>
    );
};
