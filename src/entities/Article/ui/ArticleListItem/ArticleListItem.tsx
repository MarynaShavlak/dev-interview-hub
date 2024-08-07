import { HTMLAttributeAnchorTarget, memo } from 'react';
import { GridViewItem } from './GridViewItem/GridViewItem';
import { ListViewItem } from './ListViewItem/ListViewItem';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

export interface ArticleListItemProps {
    className?: string;
    view: ArticleView;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, target, view } = props;

    if (view === ArticleView.LIST) {
        return <ListViewItem className={className} article={article} />;
    }

    return (
        <GridViewItem className={className} article={article} target={target} />
    );
});
