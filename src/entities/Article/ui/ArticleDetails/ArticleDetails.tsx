import { memo } from 'react';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';

export interface ArticleDetailsProps {
    id?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleDetailsRedesigned id={id} />}
            off={<ArticleDetailsDeprecated id={id} />}
        />
    );
});
