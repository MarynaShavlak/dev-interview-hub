import React, { memo, useMemo } from 'react';

import { ArticleCodeBlock } from '@/entities/Article';
import { useCodeBlockState } from '../../lib/hooks/useCodeBlockState/useCodeBlockState';

import { useCodeBlockOperations } from '../../lib/hooks/useCodeBlockOperations/useCodeBlockOperations';
import { CodeBlockDisplay } from '../CodeBlockDisplay/CodeBlockDisplay';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';
import { SectionType } from '@/shared/types/sectionTypes';
import { useIsEditHRInterviewAnswerPage } from '@/shared/lib/hooks/useIsEditHRInterviewAnswerPage/useIsEditHRInterviewAnswerPage';
import { useIsEditLiveCodePage } from '@/shared/lib/hooks/useIsEditLiveCodePage/useIsEditLiveCodePage';

export interface CodeBlockEditorProps {
    block: ArticleCodeBlock;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
}

export const CodeBlockEditor = memo((props: CodeBlockEditorProps) => {
    const { addBlockInArticle, deleteBlockFromArticle, block, onEditBlock } =
        props;

    const initialTitle = block.title || '';
    const initialCode = block.code || '';
    const isEditArticlePage = useIsEditArticlePage();
    const isEditHRInterviewAnswerPage = useIsEditHRInterviewAnswerPage();
    const isEditLiveCodePage = useIsEditLiveCodePage();
    const isEditPage =
        isEditArticlePage || isEditHRInterviewAnswerPage || isEditLiveCodePage;
    const isEmptyInfo = !initialTitle && !initialCode;
    const {
        title,
        handleTitleChange,
        code,
        handleCodeChange,
        isEmptyContent: hasNoContent,
    } = useCodeBlockState({
        initialTitle,
        initialCode,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        handleSaveCodeBlock,
        handleDeleteCodeBlock,
    } = useCodeBlockOperations({
        blockId: block.id,
        title,
        code,
        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
    });

    const currentBlockData: ArticleCodeBlock = useMemo(
        () =>
            isEditPage
                ? block
                : {
                      id: block.id,
                      type: SectionType.CODE,
                      code,
                      title: title || '',
                  },
        [block, code, isEditPage, title],
    );

    const formProps = {
        title,
        handleTitleChange,
        code,
        onCodeChange: handleCodeChange,
        hasNoContent,
        onSave: handleSaveCodeBlock,
    };

    const viewerProps = {
        editBlock: isEditPage ? enterEditMode : toggleEditMode,
        block: currentBlockData,
    };

    return (
        <CodeBlockDisplay
            isEditArticlePage={isEditPage}
            isEditing={isEditModeActive}
            formProps={formProps}
            onDelete={handleDeleteCodeBlock}
            viewerProps={viewerProps}
            isEmptyInfo={isEmptyInfo}
        />
    );
});
