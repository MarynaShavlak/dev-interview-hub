import { TextEditorForm, TextEditorFormProps } from '@/features/TextEditorForm';
import {
    ArticleBlockPreview,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';
import { isArticleBlock } from '../../lib/utilities/isArticleBlock/isArticleBlock';

interface ViewerProps {
    block: ArticleTextBlock | HRInterviewQABlock;
    editBlock: () => void;
}

export interface TextBlockDisplayProps {
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
                BlockComponent={(props) => {
                    if (isArticleBlock(viewerProps.block)) {
                        return (
                            <ArticleTextBlockComponent
                                {...props}
                                block={viewerProps.block}
                                withTags={false}
                            /> // Pass withTags={false}
                        );
                    }
                    return <div>HR Interview Block</div>;
                }}
            />
        );

    if (isEditArticlePage) {
        return renderContent(isFormShown);
    }

    return renderContent(!isEditing);
};
