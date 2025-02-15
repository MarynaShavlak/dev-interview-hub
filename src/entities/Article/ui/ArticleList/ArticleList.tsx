import { HTMLAttributeAnchorTarget, memo } from 'react';
import cls from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListSkeleton } from './ArticleListSkeleton/ArticleListSkeleton';
import { Each } from '@/shared/lib/components/Each/Each';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleCard } from '../../ui/ArticleCard/ArticleCard';

export interface ArticleListProps {
    className?: string;
    articles?: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view: ArticleView;
    page: number;
    articlesToRender: Article[];
}

type ArticleWithoutBlocks = Omit<Article, 'blocks'>;

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
        page,
        articlesToRender,
    } = props;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    const classes = classNames(mainClass, {}, [className, cls[view]]);

    const content = (
        <>
            <Each
                of={articlesToRender}
                render={(item, index) => {
                    return (
                        <ArticleCard
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            index={index}
                            page={page + 1}
                        />
                    );
                }}
            />
            {isLoading && <ArticleListSkeleton view={view} />}
        </>
    );

    if (view === ArticleView.LIST) {
        return (
            <VStack gap="16" className={classes}>
                {content}
            </VStack>
        );
    }

    return (
        <HStack wrap="wrap" gap="16" className={classes}>
            {content}
        </HStack>
    );
});
