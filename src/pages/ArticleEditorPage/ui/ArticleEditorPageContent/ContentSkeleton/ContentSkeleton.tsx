import React, { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/common/Stack';
import cls from './ContentSkeleton.module.scss';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export const ContentSkeleton = memo(() => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Skeleton width="100%" height="560px" border="40px" />}
            off={
                <HStack justify="center" max className={cls.loaderWrapper}>
                    <Loader />
                </HStack>
            }
        />
    );
});
