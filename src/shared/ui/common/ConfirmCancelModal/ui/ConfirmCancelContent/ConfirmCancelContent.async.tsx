import { lazy, Suspense } from 'react';
import { ConfirmCancelContentProps } from './ConfirmCancelContent';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Loader } from '@/shared/ui/deprecated/Loader';

const ConfirmDeleteContentLazy = lazy(() => import('./ConfirmCancelContent'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width={460} height={300} />}
        off={<Loader />}
    />
);
export const ConfirmCancelContentAsync = (props: ConfirmCancelContentProps) => {
    return (
        <Suspense fallback={fallback}>
            <ConfirmDeleteContentLazy {...props} />
        </Suspense>
    );
};
