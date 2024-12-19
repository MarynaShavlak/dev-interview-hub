import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const initializeEditorStateFromHTML = (
    htmlString: string,
): EditorState => {
    const contentBlock = htmlToDraft(htmlString);

    if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks,
            contentBlock.entityMap,
        );
        return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
};
