import React, { lazy, Suspense } from 'react';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddVocabularyFormProps } from './AddVocabularyForm';

const AddLinkFormLazy = lazy(() => import('./AddVocabularyForm'));

const fallback = (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<Skeleton width="100%" height={140} />}
        off={<SkeletonDeprecated width="100%" height={140} />}
    />
);

export const AddVocabularyFormAsync = (props: AddVocabularyFormProps) => {
    return (
        <Suspense fallback={fallback}>
            <AddLinkFormLazy {...props} />
        </Suspense>
    );
};
