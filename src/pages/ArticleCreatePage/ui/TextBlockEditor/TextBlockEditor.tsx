import React, { memo } from 'react';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { TextEditorForm, TextEditorFormProps } from '@/widgets/TextEditorForm';
import { useTextBlockState } from '../../lib/hooks/useTextBlockState/useTextBlockState';
import { useTextBlockOperations } from '../../lib/hooks/useTextBlockOperations/useTextBlockOperations';

interface TextBlockEditorProps {
    block: ArticleTextBlock;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

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
            <BlockPreview
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

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const { addBlockInArticle, deleteBlockFromArticle, block, onEditBlock } =
        props;
    const initialTitle = block.title || '';
    const initialParagraphs = block.paragraphs || [];
    const isEditArticlePage = Boolean(initialTitle && initialParagraphs);

    const {
        title,
        handleTitleChange,
        editorState,
        paragraphs,
        onEditorStateChange,
        isEmptyContent: hasContent,
    } = useTextBlockState({
        initialTitle,
        initialParagraphs,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        activateEditMode,
        handleSaveTextBlock,
        handleDeleteTextBlock,
    } = useTextBlockOperations({
        blockId: block.id,
        title,
        paragraphs,
        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
    });

    const currentBlockData: ArticleTextBlock = isEditArticlePage
        ? block
        : {
              id: block.id,
              type: ArticleSection.TEXT,
              paragraphs,
              title,
          };

    const formProps = {
        title,
        editorState,
        hasContent,
        handleTitleChange,
        onEditorStateChange,
        onSave: handleSaveTextBlock,
    };

    const viewerProps = {
        editBlock: isEditArticlePage ? activateEditMode : toggleEditMode,
        block: currentBlockData,
    };

    return (
        <TextBlockDisplay
            isEditArticlePage={isEditArticlePage}
            isEditing={isEditModeActive}
            formProps={formProps}
            onDelete={handleDeleteTextBlock}
            viewerProps={viewerProps}
        />
    );
});
