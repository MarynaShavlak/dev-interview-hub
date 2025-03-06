import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import cls from '../ArticleImageBlockComponent.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleImageBlockComponentSkeletonProps {
    className?: string;
}
export const ArticleImageBlockComponentSkeleton = memo(
    (props: ArticleImageBlockComponentSkeletonProps) => {
        const { className } = props;
        return (
            <VStack
                className={classNames(cls.ImgBlock, {}, [className])}
                align="center"
                gap="8"
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Skeleton width="100%" height="332px" />}
                    off={<SkeletonDeprecated width="100%" height="332px" />}
                />
            </VStack>
        );
    },
);
