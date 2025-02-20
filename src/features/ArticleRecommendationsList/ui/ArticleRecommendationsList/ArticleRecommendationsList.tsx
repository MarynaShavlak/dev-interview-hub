import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { ArticleRecommendationsListRedesigned } from './ArticleRecommendationsListRedesigned/ArticleRecommendationsListRedesigned';
import { ArticleRecommendationsListDeprecated } from './ArticleRecommendationsListDeprecated/ArticleRecommendationsListDeprecated';

export interface ArticleRecommendationsListProps {
    className?: string;
    id: string;
}

const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleRecommendationsListRedesigned {...props} />}
                off={<ArticleRecommendationsListDeprecated {...props} />}
            />
        );
    },
);

export default ArticleRecommendationsList;
