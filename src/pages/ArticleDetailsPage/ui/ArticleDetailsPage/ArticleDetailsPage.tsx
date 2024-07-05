import { memo } from 'react';
import { RedesignedArticleDetailsPage } from './RedesignedArticleDetailsPage/RedesignedArticleDetailsPage';
import { DeprecatedArticleDetailsPage } from './DeprecatedArticleDetailsPage/DeprecatedArticleDetailsPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsPageReducer } from '../../model/slices';

export interface ArticleDetailsPageProps {
    className?: string;
}
const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleDetailsPage className={className} />}
                off={<DeprecatedArticleDetailsPage className={className} />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
