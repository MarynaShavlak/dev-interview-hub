import { useCallback, useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';

export const useEditorState = (initialContent: string[] = []) => {
    const initialEditorState =
        initialContent.length > 0
            ? EditorState.createWithContent(
                  ContentState.createFromText(initialContent.join('\n')),
              )
            : EditorState.createEmpty();

    const [editorState, setEditorState] = useState(initialEditorState);
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const paragraphs = extractHtmlStrings(content);
    console.log('paragraphs', paragraphs);

    const onEditorStateChange = useCallback(
        (newState: EditorState) => setEditorState(newState),
        [],
    );
    const isEmptyContent = paragraphs.length === 0;

    return { editorState, paragraphs, onEditorStateChange, isEmptyContent };
};
