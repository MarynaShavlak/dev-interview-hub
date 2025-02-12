import React, { memo } from 'react';
import { EditorState } from 'draft-js';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TextEditorFormRedesigned } from './TextEditorFormRedesigned/TextEditorFormRedesigned';
import { TextEditorFormDeprecated } from './TextEditorFormDeprecated/TextEditorFormDeprecated';

export interface TextEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    onSave: () => void;
    onDelete: () => void;
    hasNoContent: boolean;
}

export const TextEditorForm = memo((props: TextEditorFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<TextEditorFormRedesigned {...props} />}
            off={<TextEditorFormDeprecated {...props} />}
        />
    );
});
