import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleEditorPageHeaderDeprecated } from './ArticleEditorPageHeaderDeprecated/ArticleEditorPageHeaderDeprecated';
import { ArticleEditorPageHeaderRedesigned } from './ArticleEditorPageHeaderRedesigned/ArticleEditorPageHeaderRedesigned';

export interface ArticleEditorPageHeaderProps {
    className?: string;
    hasErrors: boolean;
    isEditArticlePage: boolean;
    isLoading: boolean;
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        cancel: () => void;
        delete: () => Promise<string | null>;
    };
}

export const ArticleEditorPageHeader = memo(
    (props: ArticleEditorPageHeaderProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<ArticleEditorPageHeaderRedesigned {...props} />}
                off={<ArticleEditorPageHeaderDeprecated {...props} />}
            />
        );
    },
);
