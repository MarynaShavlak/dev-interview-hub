import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/common/Stack';

export const AdminPanelPageSkeleton = memo(() => {
    return (
        <VStack gap="24">
            <Skeleton width="100%" height="70px" />
            <Skeleton width="100%" height="700px" />
        </VStack>
    );
});
