import { memo } from 'react';
import { ArticleDetailsPageContent } from './ArticleDetailsPageContent';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsPageReducer } from '../../model/slices';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

interface ArticleDetailsPageProps {
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
                on={
                    <StickyContentLayout
                        content={ArticleDetailsPageContent({
                            isRedesigned: true,
                            className,
                        })}
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={ArticleDetailsPageContent({
                    isRedesigned: false,
                    className,
                })}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
