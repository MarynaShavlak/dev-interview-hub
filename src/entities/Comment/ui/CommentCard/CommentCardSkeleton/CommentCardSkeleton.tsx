import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import cls from '../CommentCard.module.scss';

export interface CommentCardSkeletonProps {
    className?: string;
}

export const CommentCardSkeleton = memo((props: CommentCardSkeletonProps) => {
    const { className } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack
            max
            gap="8"
            className={classNames(cls.CommentCard, {}, [
                className,
                cls.loading,
            ])}
        >
            <div className={cls.header}>
                <Skeleton
                    width={30}
                    height={30}
                    border="50%"
                    className={cls.avatar}
                />
                <Skeleton height={16} width={100} />
            </div>
            <Skeleton className={cls.text} width="100%" height={50} />
        </VStack>
    );
});
