import React, { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import cls from '../HRInterviewPage/HRInterviewPage.module.scss';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

const additionalClasses = getFlexClasses({
    hStack: true,
    gap: '8',
    align: 'center',
    justify: 'center',
});

export const HRInterviewPageSkeleton = memo(() => {
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
                    right={
                        <VStack gap="24">
                            <Card
                                className={cls.FiltersSkeletonContainer}
                                padding="24"
                            >
                                <VStack gap="32" max justify="between">
                                    <Skeleton
                                        width="100%"
                                        height="38px"
                                        border="48px"
                                    />
                                    <VStack gap="8">
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                        <Skeleton width="120px" height="36px" />
                                    </VStack>
                                    <VStack gap="8">
                                        <Skeleton width="120px" height="20px" />
                                        <Skeleton width="60px" height="32px" />
                                    </VStack>
                                </VStack>
                            </Card>
                            <Skeleton
                                width="100%"
                                height="44px"
                                border="48px"
                            />
                        </VStack>
                    }
                    content={
                        <Skeleton width="100%" height="100vh" border="12px" />
                    }
                />
            }
            off={
                <VStack gap="24">
                    <Skeleton width="100%" height="175px" />
                    <Skeleton width="100%" height="500px" />
                </VStack>
            }
        />
    );
});
