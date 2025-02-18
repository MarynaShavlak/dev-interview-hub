import { memo } from 'react';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';

export interface ArticleDetailsProps {
    id?: string;
}

// const reducers: ReducersList = {
//     articleDetails: articleDetailsReducer,
// };

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;

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
            on={<ArticleDetailsRedesigned id={id} />}
            off={<ArticleDetailsDeprecated id={id} />}
        />
        // </DynamicModuleLoader>
    );
});
