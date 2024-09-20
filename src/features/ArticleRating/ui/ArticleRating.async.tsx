import { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);
export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={fallback}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
