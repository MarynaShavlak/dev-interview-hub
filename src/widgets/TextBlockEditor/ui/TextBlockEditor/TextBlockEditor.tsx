import React, { memo, useMemo } from 'react';
import { ArticleTextBlock } from '@/entities/Article';
import { useTextBlockState } from '../../lib/hooks/useTextBlockState/useTextBlockState';
import { useTextBlockOperations } from '../../lib/hooks/useTextBlockOperations/useTextBlockOperations';
import { TextBlockDisplay } from '../TextBlockDisplay/TextBlockDisplay';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';
import { SectionType } from '@/shared/types/sectionTypes';
import { useIsEditHRInterviewAnswerPage } from '@/shared/lib/hooks/useIsEditHRInterviewAnswerPage/useIsEditHRInterviewAnswerPage';

export interface TextBlockEditorProps {
    block: ArticleTextBlock | HRInterviewQABlock;
    addBlockInArticle: (block: ArticleTextBlock | HRInterviewQABlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock | HRInterviewQABlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const { addBlockInArticle, deleteBlockFromArticle, block, onEditBlock } =
        props;
    const initialTitle = block.title || '';
    const initialParagraphs = block.paragraphs || [];
    const isEmptyInfo = !initialTitle && initialParagraphs.length === 0;
    const isEditArticlePage = useIsEditArticlePage();
    const isEditHRInterviewAnswerPage = useIsEditHRInterviewAnswerPage();
    const isEditPage = isEditArticlePage || isEditHRInterviewAnswerPage;

    const {
        title,
        handleTitleChange,
        editorState,
        paragraphs,
        onEditorStateChange,
        isEmptyContent: hasNoContent,
    } = useTextBlockState({
        initialTitle,
        initialParagraphs,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,

        handleSaveTextBlock,
        handleDeleteTextBlock,
    } = useTextBlockOperations({
        blockId: block.id,
        title: title || '',
        paragraphs,
        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
    });

    const currentBlockData: ArticleTextBlock | HRInterviewQABlock = useMemo(
        () =>
            isEditPage
                ? block
                : {
                      id: block.id,
                      type: SectionType.TEXT,
                      paragraphs,
                      title: title || '',
                  },
        [block, isEditPage, paragraphs, title],
    );

    const formProps = {
        title,
        editorState,
        hasNoContent,
        handleTitleChange,
        onEditorStateChange,
        onSave: handleSaveTextBlock,
    };

    const viewerProps = {
        editBlock: isEditPage ? enterEditMode : toggleEditMode,
        block: currentBlockData,
    };

    return (
        <TextBlockDisplay
            isEditArticlePage={isEditPage}
            isEditing={isEditModeActive}
            formProps={formProps}
            onDelete={handleDeleteTextBlock}
            viewerProps={viewerProps}
            isEmptyInfo={isEmptyInfo}
        />
    );
});
