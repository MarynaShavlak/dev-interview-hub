import { memo } from 'react';
import { RedesignedArticlesPage } from './RedesignedArticlesPage/RedesignedArticlesPage';
import { DeprecatedArticlesPage } from './DeprecatedArticlesPage/DeprecatedArticlesPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';

export interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticlesPage className={className} />}
                off={<DeprecatedArticlesPage className={className} />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
