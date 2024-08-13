import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RedesignedArticlesPage } from './RedesignedArticlesPage/RedesignedArticlesPage';
import { DeprecatedArticlesPage } from './DeprecatedArticlesPage/DeprecatedArticlesPage';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

export interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
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
