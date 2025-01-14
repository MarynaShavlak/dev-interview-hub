import { useCallback, useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';

export const useEditorState = (initialContent: string[] = []) => {
    const blocksFromHtml = htmlToDraft(initialContent.join(''));
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
    );
    const initialEditorState =
        initialContent.length > 0
            ? EditorState.createWithContent(contentState)
            : EditorState.createEmpty();

    const [editorState, setEditorState] = useState(initialEditorState);
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const paragraphs = extractHtmlStrings(content);
    const onEditorStateChange = useCallback(
        (newState: EditorState) => setEditorState(newState),
        [],
    );
    const isEmptyContent = paragraphs.length === 0;

    return { editorState, paragraphs, onEditorStateChange, isEmptyContent };
};
