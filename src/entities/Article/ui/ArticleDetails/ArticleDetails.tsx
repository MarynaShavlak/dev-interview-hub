import React, { memo } from 'react';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

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
