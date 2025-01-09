import React, { memo, useCallback } from 'react';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { useTextBlockActions } from '../../lib/hooks/useTextBlockActions/useTextBlockActions';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { TextEditorForm } from '@/widgets/TextEditorForm';
import { useTextBlockState } from '../../lib/hooks/useTextBlockState/useTextBlockState';

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
        isVisible: isBlockSaved,
        toggleVisibility: toggleBlockSaveState,
        hideElement: hideTextBlock,
        showElement: showTextBlock,
    } = useToggleVisibility();
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

    const { saveTextBlock, deleteTextBlock } = useTextBlockActions({
        blockId: block.id,
        title,
        paragraphs,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();
        hideTextBlock();
    }, [hideTextBlock, saveTextBlock]);

    const handleEditTextBlock = useCallback(() => {
        toggleBlockSaveState();
    }, [toggleBlockSaveState]);

    if (isEditMode) {
        return (
            <>
                {isBlockSaved ? (
                    <TextEditorForm
                        title={title}
                        handleTitleChange={handleTitleChange}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        onSave={handleSaveTextBlock}
                        onDelete={deleteTextBlock}
                        hasContent={isEmptyContent}
                    />
                ) : (
                    <BlockPreview
                        block={block}
                        editBlock={showTextBlock}
                        deleteBlock={deleteTextBlock}
                        BlockComponent={ArticleTextBlockComponent}
                    />
                )}
            </>
        );
    }

    return (
        <>
            {!isBlockSaved ? (
                <TextEditorForm
                    title={title}
                    handleTitleChange={handleTitleChange}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    onSave={handleSaveTextBlock}
                    onDelete={deleteTextBlock}
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
                    deleteBlock={deleteTextBlock}
                    BlockComponent={ArticleTextBlockComponent}
                />
            )}
        </>
    );
});
