import {
    ArticleBlockPreview,
    ArticleImageBlock,
    ArticleImageBlockComponent,
} from '@/entities/Article';
import {
    ImageEditorForm,
    ImageEditorFormProps,
} from '@/features/ImageEditorForm';

interface ViewerProps {
    block: ArticleImageBlock;
    editBlock: () => void;
}

export interface ImageBlockDisplayProps {
    isEditArticlePage: boolean;
    isEditing: boolean;
    formProps: Omit<ImageEditorFormProps, 'onDelete'>;
    viewerProps: ViewerProps;
    onDelete: () => void;
}

export const ImageBlockDisplay = (props: ImageBlockDisplayProps) => {
    const { isEditing, onDelete, isEditArticlePage, formProps, viewerProps } =
        props;

    const renderContent = (shouldShowForm: boolean) =>
        shouldShowForm ? (
            <ImageEditorForm {...formProps} onDelete={onDelete} />
        ) : (
            <ArticleBlockPreview
                {...viewerProps}
                deleteBlock={onDelete}
                BlockComponent={ArticleImageBlockComponent}
            />
        );

    if (isEditArticlePage) {
        return renderContent(isEditing);
    }

    return renderContent(!isEditing);
};
