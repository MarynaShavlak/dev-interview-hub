import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from '../ArticlesPage/ArticlesPage.module.scss';

const additionalClasses = getFlexClasses({
    hStack: true,
    gap: '24',
    align: 'center',
    justify: 'center',
});

export const ArticlesPageSkeleton = memo(() => {
    return (
        <StickyContentLayout
            left={
                <Card
                    border="round"
                    className={classNames(
                        cls.ViewSkeletonContainer,
                        {},
                        additionalClasses,
                    )}
                >
                    <Skeleton width="18px" height="18px" />
                    <Skeleton width="18px" height="18px" />
                </Card>
            }
            right={
                <Card className={cls.FiltersSkeletonContainer} padding="24">
                    <VStack gap="32" max>
                        <Skeleton width="100%" height="38px" border="48px" />
                        <VStack gap="8">
                            <Skeleton width="120px" height="36px" />
                            <Skeleton width="120px" height="36px" />
                            <Skeleton width="120px" height="36px" />
                            <Skeleton width="120px" height="36px" />
                            <Skeleton width="120px" height="36px" />
                        </VStack>
                        <VStack gap="8">
                            <Skeleton width="120px" height="20px" />
                            <Skeleton width="60px" height="32px" />
                            <Skeleton width="60px" height="32px" />
                        </VStack>
                    </VStack>
                </Card>
            }
            content={<Skeleton width="100%" height="100vh" border="12px" />}
        />
    );
});
