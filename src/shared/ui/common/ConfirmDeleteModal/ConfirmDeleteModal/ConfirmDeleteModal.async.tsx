import { lazy, Suspense } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { ConfirmDeleteModalProps } from './ConfirmDeleteModal';
import { Skeleton } from '../../../redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '../../../deprecated/Skeleton';

export const ConfirmDeleteModalLazy = lazy(
    () => import('./ConfirmDeleteModal'),
);

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const ConfirmDeleteModalAsync = (props: ConfirmDeleteModalProps) => {
    return (
        <Suspense fallback={fallback}>
            <ConfirmDeleteModalLazy {...props} />
        </Suspense>
    );
};
