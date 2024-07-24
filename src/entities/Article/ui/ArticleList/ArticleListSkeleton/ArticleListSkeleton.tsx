import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ArticleListItemSkeleton/ArticleListItemSkeleton';
import cls from '../ArticleList.module.scss';
import { ArticleView } from '../../../model/consts/articleConsts';

interface ArticleListSkeletonProps {
    view: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} view={view} />
        ));

export const ArticleListSkeleton = memo(
    ({ view }: ArticleListSkeletonProps) => {
        const mainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.ArticleListRedesigned,
            off: () => cls.ArticleList,
        });

        const classes = classNames(mainClass, {}, [cls[view]]);

        if (view === ArticleView.LIST) {
            return (
                <VStack gap="16" className={classes} max>
                    {getSkeletons(view)}
                </VStack>
            );
        }
        return (
            <HStack wrap="wrap" gap="16" className={classes}>
                {getSkeletons(view)}
            </HStack>
        );
    },
);
