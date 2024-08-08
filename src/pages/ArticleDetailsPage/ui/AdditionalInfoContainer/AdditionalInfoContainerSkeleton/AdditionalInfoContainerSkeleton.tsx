import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../AdditionalInfoContainer.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const AdditionalInfoContainerSkeleton = memo(() => {
    return (
        <Card padding="24" border="round" className={cls.card}>
            <VStack gap="32">
                <HStack gap="8">
                    <Skeleton width={32} height={32} border="50%" />
                    <Skeleton width={160} height={24} />
                </HStack>
                <Skeleton width={120} height={42} border="40px" />
                <Skeleton width={100} height={24} />
            </VStack>
        </Card>
    );
});
