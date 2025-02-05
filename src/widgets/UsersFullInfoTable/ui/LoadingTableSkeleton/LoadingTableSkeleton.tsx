import { memo } from 'react';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const LoadingTableSkeleton = memo(() => {
    return (
        <VStack gap="16" max align="center">
            <HStack justify="between" max>
                <Skeleton width={300} height={38} border="48px" />
            </HStack>
            <Skeleton width="100%" height={400} />
        </VStack>
    );
});
