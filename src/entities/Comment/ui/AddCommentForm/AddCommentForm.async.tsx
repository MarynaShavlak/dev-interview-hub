import React, { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddCommentFormProps } from './AddCommentForm';

const AddCommentFormLazy = lazy(() => import('./AddCommentForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const AddCommentFormAsync = (props: AddCommentFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <AddCommentFormLazy {...props} />
        </Suspense>
    );
};
