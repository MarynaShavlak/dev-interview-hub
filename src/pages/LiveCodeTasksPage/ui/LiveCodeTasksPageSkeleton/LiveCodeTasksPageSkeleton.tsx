import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const LiveCodeTasksPageSkeleton = memo(() => {
    return <Skeleton width="100%" height="100vh" />;
});
