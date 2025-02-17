import { memo } from 'react';
import { ArticleViewSelectorRedesigned } from './ArticleViewSelectorRedesigned/ArticleViewSelectorRedesigned';
import { ArticleViewSelectorDeprecated } from './ArticleViewSelectorDeprecated/ArticleViewSelectorDeprecated';
import { ArticleView } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleViewSelectorRedesigned {...props} />}
            off={<ArticleViewSelectorDeprecated {...props} />}
        />
    );
});
