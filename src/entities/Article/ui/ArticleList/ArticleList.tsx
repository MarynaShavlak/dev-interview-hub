import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useHits } from 'react-instantsearch-core';
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
}

type HitsItems = ReturnType<typeof useHits>['items'];
type ArticleWithoutBlocks = Omit<Article, 'blocks'>;

const transformItems = (items: HitsItems): Article[] => {
    return items.map((item) => {
        const { category, id, title, subtitle, user, views, createdAt } = item;
        return {
            category,
            id,
            title,
            subtitle,
            user,
            views,
            createdAt,
            blocks: [],
        };
    });
};

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
    } = props;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    const classes = classNames(mainClass, {}, [className, cls[view]]);
    const { items, results } = useHits({});
    let page = 0;
    if (results) {
        page = results.page;
    }

    console.log('results', results);

    // const { status } = useInstantSearch();
    // console.log('status', status);
    // useEffect(() => {
    //     console.log('page ', page);
    // }, [page]);
    const articlesToRender = transformItems(items);
    // console.log('articlesToRender', articlesToRender);

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
