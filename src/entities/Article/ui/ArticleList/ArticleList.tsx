import { HTMLAttributeAnchorTarget, memo, useEffect, useState } from 'react';
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
import { getDataByDocId } from '@/shared/lib/firestore/getDataByDocId/getDataByDocId';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view: ArticleView;
}

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
    const hitsApi = useHits({});

    const [fullObjects, setFullObjects] = useState<Article[] | null>(null);
    // console.log('inArticle list', hitsApi.items);

    const { items } = hitsApi;

    useEffect(() => {
        if (items?.length > 0) {
            const fetchFullObjects = async () => {
                const fullObjectsData = await Promise.all(
                    items.map(async (item) =>
                        getDataByDocId<Article>('articles', item.objectID),
                    ),
                );
                setFullObjects(
                    fullObjectsData.filter(
                        (obj): obj is Article => obj !== null,
                    ),
                );
            };

            fetchFullObjects();
        }
        console.log('items', items);
    }, [items]);

    console.log('fullObjects', fullObjects);
    const content = (
        <>
            <Each
                of={articles}
                render={(item) => {
                    return (
                        <ArticleCard
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
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
