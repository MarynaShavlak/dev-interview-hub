import { PAGE_ID } from 'shared/const/id';
import {
    ARTICLE_LIST_GAP,
    ARTICLE_LIST_ITEM_BIG_HEIGHT,
    ARTICLE_LIST_ITEM_SMALL_HEIGHT,
    ARTICLE_LIST_ITEM_SMALL_WIDTH,
} from 'shared/const/size';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { getItemCountPerRow } from 'shared/lib/getItemCountPerRow/getItemCountPerRow';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

const calculateItemsQuantity = (isBig: boolean, pageWidth: number | null) => {
    if (isBig) return 1;
    return pageWidth ? getItemCountPerRow(pageWidth, ARTICLE_LIST_ITEM_SMALL_WIDTH, ARTICLE_LIST_GAP) : 3;
};

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('articles');

    const isBig = view === ArticleView.BIG;
    const PageElement = document.getElementById(PAGE_ID);
    const pageWidth = PageElement?.offsetWidth || null;
    const itemsQuantity = calculateItemsQuantity(isBig, pageWidth);
    const itemsPerRow = isBig ? 1 : itemsQuantity;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({
        index, isScrolling, key, style,
    }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    target={target}
                    key={`str${i}`}
                    className={cls.card}
                />,
            );
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('Статті не знайдено')} />
            </div>
        );
    }

    return (
        <WindowScroller
            scrollElement={PageElement as Element}
        >
            {({
                height,
                width,
                registerChild,
                onChildScroll,
                isScrolling,
                scrollTop,
            }) => {
                return (
                    <div
                        ref={registerChild}
                        className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                    >
                        <List
                            height={height ?? ARTICLE_LIST_ITEM_BIG_HEIGHT}
                            rowCount={rowCount}
                            rowHeight={isBig ? ARTICLE_LIST_ITEM_BIG_HEIGHT : ARTICLE_LIST_ITEM_SMALL_HEIGHT + ARTICLE_LIST_GAP}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : ARTICLE_LIST_ITEM_BIG_HEIGHT}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                        {isLoading && getSkeletons(view)}
                    </div>
                );
            }}
        </WindowScroller>
    );
});
