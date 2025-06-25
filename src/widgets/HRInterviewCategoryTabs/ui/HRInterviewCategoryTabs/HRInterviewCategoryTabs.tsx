import React, { memo, useMemo } from 'react';
import {
    useHRCategoryTabs,
    useHRInterviewQACategoryCounts,
} from '@/entities/HRInterviewQA';
import { useUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { EntityCategoryTabs } from '@/features/EntityCategoryTabs';

export interface HRInterviewCategoryTabsProps {
    className?: string;
}

export const HRInterviewCategoryTabs = memo(
    (props: HRInterviewCategoryTabsProps) => {
        const { className } = props;
        const rawCategoryTabs = useHRCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);
        const currentUserdata = useUserAuthData();
        const authedUserId = currentUserdata?.id || '';
        const { data: categoryCounts, isLoading } =
            useHRInterviewQACategoryCounts(authedUserId);

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
                entityType="hrInterviewQA"
                categoryTabs={categoryTabs}
                categoryCounts={categoryCounts}
            />
        );
    },
);
