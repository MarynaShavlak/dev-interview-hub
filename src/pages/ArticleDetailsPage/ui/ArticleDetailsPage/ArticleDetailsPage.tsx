import { memo } from 'react';
import { ArticleDetailsPageRedesigned } from './ArticleDetailsPageRedesigned/ArticleDetailsPageRedesigned';
import { ArticleDetailsPageDeprecated } from './ArticleDetailsPageDeprecated/ArticleDetailsPageDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleDetailsPageRedesigned className={className} />}
            off={<ArticleDetailsPageDeprecated className={className} />}
        />
    );
};

export default memo(ArticleDetailsPage);
