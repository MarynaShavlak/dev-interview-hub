import { memo } from 'react';
import { RedesignedArticlesPage } from './RedesignedArticlesPage/RedesignedArticlesPage';
import { DeprecatedArticlesPage } from './DeprecatedArticlesPage/DeprecatedArticlesPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticlesPage />}
            off={<DeprecatedArticlesPage />}
        />
    );
};

export default memo(ArticlesPage);
