import React, { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/common/Stack';
import cls from './ContentSkeleton.module.scss';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ContentSkeletonProps {
    width?: string;
    height?: string;
}

export const ContentSkeleton = memo((props: ContentSkeletonProps) => {
    const { width = '100%', height = '560px' } = props;
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Skeleton width={width} height={height} border="40px" />}
            off={
                <HStack justify="center" max className={cls.loaderWrapper}>
                    <Loader />
                </HStack>
            }
        />
    );
});
