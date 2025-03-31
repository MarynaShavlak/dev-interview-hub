import React, { memo } from 'react';
import { ContentState, EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import cls from './MarkupHTMLCreator.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface MarkupHTMLCreatorProps {
    editorState: EditorState;
    onEditorStateChange: (editorState: EditorState) => void;
}

export const MarkupHTMLCreator = memo((props: MarkupHTMLCreatorProps) => {
    const { editorState, onEditorStateChange } = props;

    const wrapperClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.editorWrapperRedesigned,
        off: () => cls.editorWrapperDeprecated,
    });
    const toolbarClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.editorToolbarRedesigned,
        off: () => cls.editorToolbarDeprecated,
    });

    const handlePastedText = (
        text: string,
        html: string | undefined,
        editorState: EditorState,
    ) => {
        if (!text) {
            return false;
        }

        const plainTextContent = ContentState.createFromText(text);
        const currentSelection = editorState.getSelection();
        const newContentState = Modifier.replaceWithFragment(
            editorState.getCurrentContent(),
            currentSelection,
            plainTextContent.getBlockMap(),
        );

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-fragment',
        );

        onEditorStateChange(newEditorState);

        return true;
    };

    return (
        <Editor
            handlePastedText={handlePastedText}
            editorState={editorState}
            toolbar={{
                options: ['inline', 'emoji', 'list', 'remove', 'history'],
                inline: {
                    options: [
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'superscript',
                        'subscript',
                    ],
                },

                list: {
                    options: ['unordered', 'ordered'],
                },
            }}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName={toolbarClass}
            wrapperClassName={wrapperClass}
            editorClassName={cls.editorTextArea}
        />
    );
});
