import { HTMLAttributeAnchorTarget, memo } from 'react';
import { GridViewCard } from './GridViewCard/GridViewCard';
import { ListViewCard } from './ListViewCard/ListViewCard';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

export interface ArticleCardProps {
    className?: string;
    view: ArticleView;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    index: number;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
    const { className, article, target, view, index } = props;

    if (view === ArticleView.LIST) {
        return (
            <ListViewCard
                className={className}
                article={article}
                index={index}
            />
        );
    }

    return (
        <GridViewCard
            className={className}
            article={article}
            target={target}
            index={index}
        />
    );
});
