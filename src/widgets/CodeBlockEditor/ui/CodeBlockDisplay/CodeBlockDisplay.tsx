import {
    ArticleBlockPreview,
    ArticleCodeBlock,
    ArticleCodeBlockComponent,
} from '@/entities/Article';
import { CodeEditorForm, CodeEditorFormProps } from '@/features/CodeEditorForm';

interface ViewerProps {
    block: ArticleCodeBlock;
    editBlock: () => void;
}

interface CodeBlockDisplayProps {
    isEditArticlePage: boolean;
    isEditing: boolean;
    formProps: Omit<CodeEditorFormProps, 'onDelete'>;
    viewerProps: ViewerProps;
    onDelete: () => void;
}

export const CodeBlockDisplay = (props: CodeBlockDisplayProps) => {
    const { isEditing, onDelete, isEditArticlePage, formProps, viewerProps } =
        props;

    const renderContent = (shouldShowForm: boolean) =>
        shouldShowForm ? (
            <CodeEditorForm {...formProps} onDelete={onDelete} />
        ) : (
            <ArticleBlockPreview
                {...viewerProps}
                deleteBlock={onDelete}
                BlockComponent={ArticleCodeBlockComponent}
            />
        );

    if (isEditArticlePage) {
        return renderContent(isEditing);
    }

    return renderContent(!isEditing);
};
