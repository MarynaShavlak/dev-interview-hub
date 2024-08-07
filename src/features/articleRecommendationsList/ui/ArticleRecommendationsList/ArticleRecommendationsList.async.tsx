import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleRecommendationsListProps } from './ArticleRecommendationsList';

const ArticleRecommendationsListLazy = lazy(
    () => import('./ArticleRecommendationsList'),
);

export const ArticleRecommendationsListAsync = (
    props: ArticleRecommendationsListProps,
) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <ArticleRecommendationsListLazy {...props} />
        </Suspense>
    );
};
