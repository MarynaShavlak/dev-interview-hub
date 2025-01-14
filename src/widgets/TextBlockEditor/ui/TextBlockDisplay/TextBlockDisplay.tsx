import { TextEditorForm, TextEditorFormProps } from '@/features/TextEditorForm';
import {
    ArticleBlockPreview,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';

interface ViewerProps {
    block: ArticleTextBlock;
    editBlock: () => void;
}

interface TextBlockDisplayProps {
    isEditArticlePage: boolean;
    isEditing: boolean;
    formProps: Omit<TextEditorFormProps, 'onDelete'>;
    viewerProps: ViewerProps;
    onDelete: () => void;
}

export const TextBlockDisplay = (props: TextBlockDisplayProps) => {
    const { isEditing, onDelete, isEditArticlePage, formProps, viewerProps } =
        props;

    const renderContent = (shouldShowForm: boolean) =>
        shouldShowForm ? (
            <TextEditorForm {...formProps} onDelete={onDelete} />
        ) : (
            <ArticleBlockPreview
                {...viewerProps}
                deleteBlock={onDelete}
                BlockComponent={ArticleTextBlockComponent}
            />
        );

    if (isEditArticlePage) {
        return renderContent(isEditing);
    }

    return renderContent(!isEditing);
};
