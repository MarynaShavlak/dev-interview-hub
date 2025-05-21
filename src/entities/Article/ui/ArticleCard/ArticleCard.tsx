import { HTMLAttributeAnchorTarget, memo } from 'react';
import { GridViewCard } from './GridViewCard/GridViewCard';
import { ListViewCard } from './ListViewCard/ListViewCard';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { SequenceViewCard } from './SequenceViewCard/SequenceViewCard';

export interface BaseCardProps {
    className?: string;
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    handleClick?: () => void;
    index?: number;
    page?: number;
}

interface ArticleCardProps extends BaseCardProps {
    view: ArticleView;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
    const { className, article, target, view, handleClick, index, page } =
        props;
    const computedIndex =
        view === ArticleView.SEQUENCE && index !== undefined && page
            ? (page - 1) * 20 + index + 1
            : undefined;

    const commonProps = { className, article, target, handleClick };

    switch (view) {
        case ArticleView.LIST:
            return <ListViewCard {...commonProps} />;
        case ArticleView.GRID:
            return <GridViewCard {...commonProps} />;
        case ArticleView.SEQUENCE:
            return <SequenceViewCard {...commonProps} index={computedIndex} />;
        default: {
            const exhaustiveCheck: never = view;
            throw new Error(`Unhandled ArticleView case: ${exhaustiveCheck}`);
        }
    }
});
