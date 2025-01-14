import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';
import { useEditorState } from '../../../../../pages/ArticleCreatePage/lib/hooks/useEditorState/useEditorState';

interface UseTextBlockStateProps {
    initialTitle: string;
    initialParagraphs: string[];
}

export const useTextBlockState = ({
    initialTitle,
    initialParagraphs,
}: UseTextBlockStateProps) => {
    const { value: title, handleChange: handleTitleChange } =
        useTextInput(initialTitle);
    const { editorState, paragraphs, onEditorStateChange, isEmptyContent } =
        useEditorState(initialParagraphs);

    return {
        title,
        handleTitleChange,
        editorState,
        paragraphs,
        onEditorStateChange,
        isEmptyContent,
    };
};
