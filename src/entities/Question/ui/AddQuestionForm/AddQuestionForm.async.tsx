import React, { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddQuestionFormProps } from './AddQuestionForm';

const AddQuestionFormLazy = lazy(() => import('./AddQuestionForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const AddQuestionFormAsync = (props: AddQuestionFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <AddQuestionFormLazy {...props} />
        </Suspense>
    );
};
