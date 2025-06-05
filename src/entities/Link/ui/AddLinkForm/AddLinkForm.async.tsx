import React, { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddLinkFormProps } from './AddLinkForm';

const AddLinkFormLazy = lazy(() => import('./AddLinkForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const AddLinkFormAsync = (props: AddLinkFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <AddLinkFormLazy {...props} />
        </Suspense>
    );
};
