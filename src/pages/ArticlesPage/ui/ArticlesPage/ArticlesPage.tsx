import { memo } from 'react';
import { RedesignedArticlesPage } from './RedesignedArticlesPage/RedesignedArticlesPage';
import { DeprecatedArticlesPage } from './DeprecatedArticlesPage/DeprecatedArticlesPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticlesPage className={className} />}
            off={<DeprecatedArticlesPage className={className} />}
        />
    );
};

export default memo(ArticlesPage);
