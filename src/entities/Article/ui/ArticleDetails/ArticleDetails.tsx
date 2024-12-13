import { memo } from 'react';
import { RedesignedArticleDetails } from './RedesignedArticleDetails/RedesignedArticleDetails';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleDetails } from './DeprecatedArticleDetails/DeprecatedArticleDetails';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface ArticleDetailsProps {
    id?: string;
}

// const reducers: ReducersList = {
//     articleDetails: articleDetailsReducer,
// };

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    // useInitialEffect(() => {
    //     dispatch(fetchArticleByIdThunk(id));
    // });

    // useEffect(() => {
    //     if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
    //         if (id) {
    //             const action = dispatch(fetchArticleByIdThunk(id));
    //             return () => {
    //                 action.abort();
    //             };
    //         }
    //     }
    //
    //     return undefined;
    // }, [dispatch, id]);

    return (
        // <DynamicModuleLoader reducers={reducers}>
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleDetails id={id} />}
            off={<DeprecatedArticleDetails id={id} />}
        />
        // </DynamicModuleLoader>
    );
});
