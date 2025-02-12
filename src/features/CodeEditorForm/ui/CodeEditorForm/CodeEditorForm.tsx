import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { CodeEditorFormRedesigned } from './CodeEditorFormRedesigned/CodeEditorFormRedesigned';
import { CodeEditorFormDeprecated } from './CodeEditorFormDeprecated/CodeEditorFormDeprecated';

export interface CodeEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    code: string;
    onCodeChange: (code: string) => void;
    onSave: () => void;
    onDelete: () => void;
    hasNoContent: boolean;
}

export const CodeEditorForm = memo((props: CodeEditorFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<CodeEditorFormRedesigned {...props} />}
            off={<CodeEditorFormDeprecated {...props} />}
        />
    );
});
