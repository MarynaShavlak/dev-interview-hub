import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/common/Stack';

export const ArticleCreatePageSkeleton = memo(() => {
    return (
        <VStack gap="24">
            <Skeleton width="100%" height="75px" border="16px" />
            <HStack gap="16" align="start" justify="start">
                <Skeleton width="40px" height="40px" border="50%" />
                <VStack gap="16">
                    <Skeleton width="180px" height="24px" />
                    <Skeleton width="615px" height="38px" border="48px" />
                </VStack>
            </HStack>
            <HStack gap="16" align="start" justify="start">
                <Skeleton width="40px" height="40px" border="50%" />
                <VStack gap="16">
                    <Skeleton width="180px" height="24px" />
                    <Skeleton width="615px" height="38px" border="48px" />
                </VStack>
            </HStack>
            <HStack gap="16" align="start" justify="start">
                <Skeleton width="40px" height="40px" border="50%" />
                <VStack gap="16">
                    <Skeleton width="180px" height="24px" />
                    <Skeleton width="770px" height="200px" border="12px" />
                </VStack>
            </HStack>
            <HStack gap="16" align="start" justify="start">
                <Skeleton width="40px" height="40px" border="50%" />
                <VStack gap="16">
                    <Skeleton width="180px" height="24px" />
                    <Skeleton width="250px" height="24px" />
                    <HStack gap="16">
                        <Skeleton width="100px" height="36px" border="40px" />
                        <Skeleton width="100px" height="36px" border="40px" />
                        <Skeleton width="100px" height="36px" border="40px" />
                        <Skeleton width="100px" height="36px" border="40px" />
                        <Skeleton width="100px" height="36px" border="40px" />
                    </HStack>
                </VStack>
            </HStack>
            <HStack gap="16" align="start" justify="start">
                <Skeleton width="40px" height="40px" border="50%" />
                <VStack gap="16">
                    <Skeleton width="180px" height="24px" />
                    <Skeleton width="250px" height="24px" />
                    <HStack gap="16">
                        <Skeleton width="180px" height="43px" border="34px" />
                        <Skeleton width="180px" height="43px" border="34px" />
                        <Skeleton width="180px" height="43px" border="34px" />
                        <Skeleton width="180px" height="43px" border="34px" />
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
});
