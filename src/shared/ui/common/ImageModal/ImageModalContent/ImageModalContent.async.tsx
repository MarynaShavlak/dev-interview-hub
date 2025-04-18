import { lazy, Suspense } from 'react';
import { ImageModalContentProps } from './ImageModalContent';

import { Skeleton } from '../../../redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Loader } from '../../../deprecated/Loader';

const ImageModalContentLazy = lazy(() => import('./ImageModalContent'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width={1000} height={500} />}
        off={<Loader />}
    />
);
export const ImageModalContentAsync = (props: ImageModalContentProps) => {
    return (
        <Suspense fallback={fallback}>
            <ImageModalContentLazy {...props} />
        </Suspense>
    );
};
