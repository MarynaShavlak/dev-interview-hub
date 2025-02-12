import React, { memo } from 'react';

import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleMetaFormRedesigned } from './ArticleMetaFormRedesigned/ArticleMetaFormRedesigned';
import { ArticleMetaFormDeprecated } from './ArticleMetaFormDeprecated/ArticleMetaFormDeprecated';

export interface ArticleMetaFormProps {
    titleIndex: number;
    subtitleIndex: number;
    errors: {
        hasInputErrors: boolean;
        titleErrors: ValidationErrors;
        subtitleTextErrors: ValidationErrors;
        subtitleLinkErrors: ValidationErrors;
    };
}

export const ArticleMetaForm = memo((props: ArticleMetaFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleMetaFormRedesigned {...props} />}
            off={<ArticleMetaFormDeprecated {...props} />}
        />
    );
});
