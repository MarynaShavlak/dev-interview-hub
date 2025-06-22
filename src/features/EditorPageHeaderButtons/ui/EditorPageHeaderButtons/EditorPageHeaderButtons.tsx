import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { EditorPageHeaderButtonsRedesigned } from './EditorPageHeaderButtonsRedesigned/EditorPageHeaderButtonsRedesigned';
import { EditorPageHeaderButtonsDeprecated } from './EditorPageHeaderButtonsDeprecated/EditorPageHeaderButtonsDeprecated';

export interface EditorPageHeaderButtonsProps {
    isEditPage: boolean;
    canSave: boolean;
    onClear: () => void;
    onCancelEdit: () => void;
    onUpdate: () => void;
    onSave: () => void;
    onDelete: () => void;
    className?: string;
}

export const EditorPageHeaderButtons = memo(
    (props: EditorPageHeaderButtonsProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<EditorPageHeaderButtonsRedesigned {...props} />}
                off={<EditorPageHeaderButtonsDeprecated {...props} />}
            />
        );
    },
);
