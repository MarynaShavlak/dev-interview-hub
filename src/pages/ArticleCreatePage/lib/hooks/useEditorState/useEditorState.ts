import { useCallback, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';

export const useEditorState = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const paragraphs = extractHtmlStrings(content);

    const onEditorStateChange = useCallback(
        (newState: EditorState) => setEditorState(newState),
        [],
    );
    const isEmptyContent = paragraphs.length === 0;

    return { editorState, paragraphs, onEditorStateChange, isEmptyContent };
};
