import React, { memo } from 'react';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { TextEditorForm } from '@/widgets/TextEditorForm';
import { useTextBlockState } from '../../lib/hooks/useTextBlockState/useTextBlockState';
import { useTextBlockOperations } from '../../lib/hooks/useTextBlockOperations/useTextBlockOperations';

interface TextBlockEditorProps {
    className?: string;
    // blockId: string;
    block: ArticleTextBlock;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const {
        addBlockInArticle,
        deleteBlockFromArticle,
        // blockId,
        block,
        onEditBlock,
        className,
    } = props;
    const initialTitle = block.title || '';
    const initialParagraphs = block.paragraphs || [];
    const isEditMode = Boolean(initialTitle && initialParagraphs);

    const {
        title,
        handleTitleChange,
        editorState,
        paragraphs,
        onEditorStateChange,
        isEmptyContent,
    } = useTextBlockState({
        initialTitle,
        initialParagraphs,
    });

    const {
        isEditing,
        handleEditTextBlock,
        openEditing,
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

    if (isEditMode) {
        return (
            <>
                {isEditing ? (
                    <TextEditorForm
                        title={title}
                        handleTitleChange={handleTitleChange}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        onSave={handleSaveTextBlock}
                        onDelete={handleDeleteTextBlock}
                        hasContent={isEmptyContent}
                    />
                ) : (
                    <BlockPreview
                        block={block}
                        editBlock={openEditing}
                        deleteBlock={handleDeleteTextBlock}
                        BlockComponent={ArticleTextBlockComponent}
                    />
                )}
            </>
        );
    }

    return (
        <>
            {!isEditing ? (
                <TextEditorForm
                    title={title}
                    handleTitleChange={handleTitleChange}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    onSave={handleSaveTextBlock}
                    onDelete={handleDeleteTextBlock}
                    hasContent={isEmptyContent}
                />
            ) : (
                <BlockPreview
                    block={{
                        id: block.id,
                        type: ArticleSection.TEXT,
                        paragraphs,
                        title,
                    }}
                    editBlock={handleEditTextBlock}
                    deleteBlock={handleDeleteTextBlock}
                    BlockComponent={ArticleTextBlockComponent}
                />
            )}
        </>
    );
});
