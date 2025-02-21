import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/common/Stack';

export const MyArticlesPageSkeleton = memo(() => {
    return (
        <VStack gap="24">
            <Skeleton width="100%" height="44px" />
            <Skeleton width="100%" height="700px" />
        </VStack>
    );
});
