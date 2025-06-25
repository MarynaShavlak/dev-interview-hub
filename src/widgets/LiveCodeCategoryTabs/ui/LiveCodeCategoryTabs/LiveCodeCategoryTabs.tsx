import React, { memo, useMemo } from 'react';
import {
    useLiveCodeCategoryTabs,
    useLiveCodeCategoryCounts,
} from '@/entities/LiveCode';
import { EntityCategoryTabs } from '@/features/EntityCategoryTabs';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { useUserAuthData } from '@/entities/User';

export interface LiveCodeCategoryTabsProps {
    className?: string;
}

export const LiveCodeCategoryTabs = memo((props: LiveCodeCategoryTabsProps) => {
    const { className } = props;
    const rawCategoryTabs = useLiveCodeCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';

    const { data: categoryCounts, isLoading } =
        useLiveCodeCategoryCounts(authedUserId);
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    if (isLoading) {
        return <Skeleton width="450px" height="870px" />;
    }
    if (!categoryCounts) {
        return null;
    }

    return (
        <EntityCategoryTabs
            className={className}
            entityType="liveCode"
            categoryTabs={categoryTabs}
            categoryCounts={categoryCounts}
        />
    );
});
