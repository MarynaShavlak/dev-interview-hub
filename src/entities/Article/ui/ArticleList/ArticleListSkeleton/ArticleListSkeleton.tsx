import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../ArticleList.module.scss';
import { ArticleView } from '../../../model/consts/articleConsts';
import { ArticleCardSkeleton } from '../../ArticleCardSkeleton/ArticleCardSkeleton';

interface ArticleListSkeletonProps {
    view: ArticleView;
    skeletonCount?: number;
}

const getSkeletons = (view: ArticleView, count: number) =>
    new Array(count)
        .fill(0)
        .map((item, index) => <ArticleCardSkeleton key={index} view={view} />);

export const ArticleListSkeleton = memo(
    ({ view, skeletonCount }: ArticleListSkeletonProps) => {
        const mainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => '',
            off: () => cls.ArticleList,
        });

        const classes = classNames(mainClass, {}, [cls[view]]);
        const defaultSkeletonCount = view === ArticleView.GRID ? 9 : 3;
        const count = skeletonCount ?? defaultSkeletonCount;

        if (view === ArticleView.LIST) {
            return (
                <VStack gap="16" className={classes} max>
                    {getSkeletons(view, count)}
                </VStack>
            );
        }
        return (
            <HStack
                wrap="wrap"
                gap="24"
                className={classes}
                justify="center"
                align="center"
            >
                {getSkeletons(view, count)}
            </HStack>
        );
    },
);
