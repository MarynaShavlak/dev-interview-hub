import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import cls from '../ArticleDetails.module.scss';

const DeprecatedArticleDetailsSkeleton = memo(() => {
    return (
        <>
            <SkeletonDeprecated
                className={cls.avatar}
                width={200}
                height={200}
                border="50%"
            />
            <SkeletonDeprecated width={300} height={32} />
            <SkeletonDeprecated width={600} height={24} />
            <SkeletonDeprecated width="100%" height={200} />
            <SkeletonDeprecated width="100%" height={200} />
        </>
    );
});

const RedesignedArticleDetailsSkeleton = memo(() => {
    return (
        <>
            <Skeleton width="90%" height={24} />
            <Skeleton width="60%" height={32} />
            <Skeleton className={cls.avatar} width="100%" height={300} />
            <Skeleton width="100%" height={200} />
            <Skeleton width="100%" height={200} />
        </>
    );
});

export const ArticleDetailsSkeleton = memo(() => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleDetailsSkeleton />}
            off={<DeprecatedArticleDetailsSkeleton />}
        />
    );
});
