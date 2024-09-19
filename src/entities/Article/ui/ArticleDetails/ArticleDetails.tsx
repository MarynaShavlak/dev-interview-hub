import { memo } from 'react';
import { RedesignedArticleDetails } from './RedesignedArticleDetails/RedesignedArticleDetails';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleDetails } from './DeprecatedArticleDetails/DeprecatedArticleDetails';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';

export interface ArticleDetailsProps {
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleDetails />}
                off={<DeprecatedArticleDetails />}
            />
        </DynamicModuleLoader>
    );
});
