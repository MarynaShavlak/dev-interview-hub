import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { AddCommentFormProps } from './AddCommentForm';

const AddCommentFormLazy = lazy(
    () => import('./AddCommentForm'),
);

export const AddCommentFormAsync = (props: AddCommentFormProps) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <AddCommentFormLazy {...props} />
        </Suspense>
    );
};
