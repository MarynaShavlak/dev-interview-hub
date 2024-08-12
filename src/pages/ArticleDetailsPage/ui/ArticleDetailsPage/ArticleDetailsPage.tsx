import { memo } from 'react';
import { RedesignedArticleDetailsPage } from './RedesignedArticleDetailsPage/RedesignedArticleDetailsPage';
import { DeprecatedArticleDetailsPage } from './DeprecatedArticleDetailsPage/DeprecatedArticleDetailsPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleDetailsPage className={className} />}
            off={<DeprecatedArticleDetailsPage className={className} />}
        />
    );
};

export default memo(ArticleDetailsPage);
