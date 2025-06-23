import { memo } from 'react';
import { AdditionalInfoContainerSkeleton } from '../AdditionalInfoContainer/AdditionalInfoContainerSkeleton/AdditionalInfoContainerSkeleton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../LiveCodeTaskDetailsPage/LiveCodeTaskDetailsPage.module.scss';

export const LiveCodeTaskDetailsPageSkeleton = memo(() => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    left={
                        <Skeleton width="120px" height="40px" border="34px" />
                    }
                    right={<AdditionalInfoContainerSkeleton />}
                    content={
                        <Skeleton width="100%" height="100vh" border="40px" />
                    }
                />
            }
            off={
                <VStack gap="16">
                    <HStack max justify="between">
                        <Skeleton width="164px" height="38px" />
                        <Skeleton width="182px" height="38px" />
                    </HStack>
                    <HStack
                        max
                        justify="center"
                        align="center"
                        className={cls.avatarWrap}
                    >
                        <Skeleton width="175px" height="175px" border="50%" />
                    </HStack>
                    <Skeleton width="100%" height="300px" />
                </VStack>
            }
        />
    );
});
