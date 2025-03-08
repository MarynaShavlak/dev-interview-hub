import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { CommentListSkeleton } from '@/entities/Comment';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const ArticleCommentsSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const formBlockHeight = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '90px',
        off: () => '80px',
    });
    return (
        <VStack gap="16" max>
            <Skeleton width="160px" height="40px" />
            <Skeleton width="100%" height={formBlockHeight} />
            <CommentListSkeleton />
        </VStack>
    );
});
