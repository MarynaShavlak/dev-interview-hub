import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HRInterviewQAEditorPageHeaderDeprecated } from './HRInterviewQAEditorPageHeaderDeprecated/HRInterviewQAEditorPageHeaderDeprecated';
import { HRInterviewQAEditorPageHeaderRedesigned } from './HRInterviewQAEditorPageHeaderRedesigned/HRInterviewQAEditorPageHeaderRedesigned';

export interface HRInterviewQAEditorPageHeaderProps {
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

export const HRInterviewQAEditorPageHeader = memo(
    (props: HRInterviewQAEditorPageHeaderProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<HRInterviewQAEditorPageHeaderRedesigned {...props} />}
                off={<HRInterviewQAEditorPageHeaderDeprecated {...props} />}
            />
        );
    },
);
