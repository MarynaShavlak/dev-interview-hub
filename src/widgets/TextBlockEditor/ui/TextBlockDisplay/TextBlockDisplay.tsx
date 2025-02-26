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
    isEmptyInfo: boolean;
}

export const TextBlockDisplay = (props: TextBlockDisplayProps) => {
    const {
        isEditing,
        onDelete,
        isEditArticlePage,
        formProps,
        viewerProps,
        isEmptyInfo,
    } = props;

    const isFormShown =
        (isEditing && !isEmptyInfo) || (!isEditing && isEmptyInfo);

    const renderContent = (shouldShowForm: boolean) =>
        shouldShowForm ? (
            <TextEditorForm {...formProps} onDelete={onDelete} />
        ) : (
            <ArticleBlockPreview
                {...viewerProps}
                deleteBlock={onDelete}
                BlockComponent={(props) => (
                    <ArticleTextBlockComponent {...props} withTags={false} /> // Pass withTags={false}
                )}
            />
        );

    if (isEditArticlePage) {
        return renderContent(isFormShown);
    }

    return renderContent(!isEditing);
};
