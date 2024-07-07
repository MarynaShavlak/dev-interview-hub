import { memo } from 'react';
import { AdditionalInfoContainerSkeleton } from '../AdditionalInfoContainer/AdditionalInfoContainerSkeleton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ArticleDetailsPageSkeleton = memo(() => {
    return (
        <StickyContentLayout
            left={<Skeleton width="120px" height="40px" border="34px" />}
            right={<AdditionalInfoContainerSkeleton />}
            content={<Skeleton width="100%" height="100vh" border="40px" />}
        />
    );
});
