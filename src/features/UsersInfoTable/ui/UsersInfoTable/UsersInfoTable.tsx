import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/common/Stack';
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

    return (
        <VStack gap="24">
            <Table data={d} columns={c} />
        </VStack>
    );
};
