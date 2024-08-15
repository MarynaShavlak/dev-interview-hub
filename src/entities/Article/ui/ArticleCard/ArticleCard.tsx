import { HTMLAttributeAnchorTarget, memo } from 'react';
import { GridViewCard } from './GridViewCard/GridViewCard';
import { ListViewCard } from './ListViewCard/ListViewCard';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

export interface BaseCardProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    handleClick?: () => void;
}

interface ArticleCardProps extends BaseCardProps {
    view: ArticleView;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
    const { className, article, target, view, handleClick } = props;

    if (view === ArticleView.LIST) {
        return (
            <ListViewCard
                className={className}
                article={article}
                handleClick={handleClick}
            />
        );
    }

    return (
        <GridViewCard
            className={className}
            article={article}
            target={target}
            handleClick={handleClick}
        />
    );
});
