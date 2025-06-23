import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { LiveCodeEditorPageHeaderDeprecated } from './LiveCodeEditorPageHeaderDeprecated/LiveCodeEditorPageHeaderDeprecated';
import { LiveCodeEditorPageHeaderRedesigned } from './LiveCodeEditorPageHeaderRedesigned/LiveCodeEditorPageHeaderRedesigned';

export interface LiveCodeEditorPageHeaderProps {
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

export const LiveCodeEditorPageHeader = memo(
    (props: LiveCodeEditorPageHeaderProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<LiveCodeEditorPageHeaderRedesigned {...props} />}
                off={<LiveCodeEditorPageHeaderDeprecated {...props} />}
            />
        );
    },
);
