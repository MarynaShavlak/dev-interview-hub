import { memo } from 'react';
import { RedesignedArticleViewSelector } from './RedesignedArticleViewSelector/RedesignedArticleViewSelector';
import { DeprecatedArticleViewSelector } from './DeprecatedArticleViewSelector/DeprecatedArticleViewSelector';
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
            on={<RedesignedArticleViewSelector {...props} />}
            off={<DeprecatedArticleViewSelector {...props} />}
        />
    );
});
