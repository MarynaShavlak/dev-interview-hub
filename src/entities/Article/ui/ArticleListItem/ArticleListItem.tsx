import { HTMLAttributeAnchorTarget, memo } from 'react';
import { GridViewItem } from './ArticleListItem/GridViewItem/GridViewItem';
import { ListViewItem } from './ArticleListItem/ListViewItem/ListViewItem';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    if (view === ArticleView.LIST) {
        return (
            <ListViewItem className={className} article={article} view={view} />
        );
    }

    return (
        <GridViewItem
            className={className}
            article={article}
            view={view}
            target={target}
        />
    );
});
