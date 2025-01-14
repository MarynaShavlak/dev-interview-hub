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
    block: ArticleTextBlock;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

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
        isEmptyContent,
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

    const renderEditorForm = () => (
        <TextEditorForm
            title={title}
            handleTitleChange={handleTitleChange}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            onSave={handleSaveTextBlock}
            onDelete={handleDeleteTextBlock}
            hasContent={isEmptyContent}
        />
    );

    const renderViewer = ({ block, editBlock }: any) => (
        <BlockPreview
            block={block}
            editBlock={editBlock}
            deleteBlock={handleDeleteTextBlock}
            BlockComponent={ArticleTextBlockComponent}
        />
    );

    if (isEditArticlePage) {
        return (
            <>
                {
                    isEditModeActive
                        ? renderEditorForm()
                        : renderViewer({
                              block: currentBlockData,
                              editBlock: isEditArticlePage
                                  ? activateEditMode
                                  : toggleEditMode,
                          })

                    // <BlockPreview
                    //     block={currentBlockData}
                    //     editBlock={activateEditMode}
                    //     deleteBlock={handleDeleteTextBlock}
                    //     BlockComponent={ArticleTextBlockComponent}
                    // />
                }
            </>
        );
    }

    return (
        <>
            {
                !isEditModeActive
                    ? renderEditorForm()
                    : renderViewer({
                          block: currentBlockData,
                          editBlock: isEditArticlePage
                              ? activateEditMode
                              : toggleEditMode,
                      })
                // <BlockPreview
                //     block={currentBlockData}
                //     editBlock={toggleEditMode}
                //     deleteBlock={handleDeleteTextBlock}
                //     BlockComponent={ArticleTextBlockComponent}
                // />
            }
        </>
    );
});
