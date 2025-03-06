import { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleCard/ArticleCard.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const SequenceViewSkeleton = memo(() => {
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    return (
        <Card
            border="partial"
            padding="24"
            className={classNames(cls.SEQUENCE, {}, [...additionalClasses])}
            max
        >
            <HStack justify="between" max>
                <HStack gap="24">
                    <Skeleton border="50%" height={50} width={50} />
                    <Skeleton width="300px" height={24} />
                </HStack>
                <Skeleton border="34px" height={43} width={96} />
            </HStack>
        </Card>
    );
});
