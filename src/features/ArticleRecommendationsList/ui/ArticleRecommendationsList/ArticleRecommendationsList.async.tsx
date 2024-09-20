import { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRecommendationsListProps } from './ArticleRecommendationsList';

const ArticleRecommendationsListLazy = lazy(
    () => import('./ArticleRecommendationsList'),
);
const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const ArticleRecommendationsListAsync = (
    props: ArticleRecommendationsListProps,
) => {
    return (
        <Suspense fallback={fallback}>
            <ArticleRecommendationsListLazy {...props} />
        </Suspense>
    );
};
