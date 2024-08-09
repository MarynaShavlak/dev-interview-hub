import { lazy, Suspense } from 'react';
import { LoginFormProps } from './LoginForm';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Loader } from '@/shared/ui/deprecated/Loader';

const LoginFormLazy = lazy(() => import('./LoginForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width={460} height={300} />}
        off={<Loader />}
    />
);
export const LoginFormAsync = (props: LoginFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <LoginFormLazy {...props} />
        </Suspense>
    );
};
