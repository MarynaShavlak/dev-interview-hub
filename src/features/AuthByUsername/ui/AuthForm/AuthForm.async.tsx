import { lazy, Suspense } from 'react';
import { AuthFormProps } from './AuthForm';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Loader } from '@/shared/ui/deprecated/Loader';

const AuthFormLazy = lazy(() => import('./AuthForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width={460} height={300} />}
        off={<Loader />}
    />
);
export const AuthFormAsync = (props: AuthFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <AuthFormLazy {...props} />
        </Suspense>
    );
};
