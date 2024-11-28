import { memo, useEffect } from 'react';
import { RedesignedArticleDetails } from './RedesignedArticleDetails/RedesignedArticleDetails';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleDetails } from './DeprecatedArticleDetails/DeprecatedArticleDetails';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchArticleByIdThunk } from '../../model/services/fetchArticleByIdThunk/fetchArticleByIdThunk';
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
    // useInitialEffect(() => {
    //     dispatch(fetchArticleByIdThunk(id));
    // });

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            if (id) {
                const action = dispatch(fetchArticleByIdThunk(id));
                return () => {
                    action.abort();
                };
            }
        }

        return undefined;
    }, [dispatch, id]);

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
