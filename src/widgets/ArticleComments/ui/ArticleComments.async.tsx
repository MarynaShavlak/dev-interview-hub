import React, { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleCommentsProps } from './ArticleComments';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

const ArticleCommentsLazy = lazy(() => import('./ArticleComments'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const ArticleCommentsAsync = (props: ArticleCommentsProps) => {
    return (
        <Suspense fallback={fallback}>
            <ArticleCommentsLazy {...props} />
        </Suspense>
    );
};
