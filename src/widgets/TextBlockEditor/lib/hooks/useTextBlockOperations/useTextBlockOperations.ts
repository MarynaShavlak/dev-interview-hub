import { useCallback } from 'react';
import { ArticleTextBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';
import { SectionType } from '@/shared/types/sectionTypes';
import { useIsEditHRInterviewAnswerPage } from '@/shared/lib/hooks/useIsEditHRInterviewAnswerPage/useIsEditHRInterviewAnswerPage';
import { useIsEditLiveCodePage } from '@/shared/lib/hooks/useIsEditLiveCodePage/useIsEditLiveCodePage';

interface UseTextBlockOperationsProps {
    blockId: string;
    title: string;
    paragraphs: string[];
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const useTextBlockOperations = ({
    blockId,
    title,
    paragraphs,
    addBlockInArticle,
    deleteBlockFromArticle,
    onEditBlock,
}: UseTextBlockOperationsProps) => {
    const isEditArticlePage = useIsEditArticlePage();
    const isEditHRInterviewAnswerPage = useIsEditHRInterviewAnswerPage();
    const isEditLiveCodePage = useIsEditLiveCodePage();
    const isEditPage =
        isEditArticlePage || isEditHRInterviewAnswerPage || isEditLiveCodePage;

    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hide: exitEditMode,
        show: enterEditMode,
    } = useToggleVisibility();

    const saveTextBlock = useCallback(() => {
        const updatedTextBlock: ArticleTextBlock = {
            id: blockId,
            type: SectionType.TEXT,
            paragraphs,
            title: title || '',
        };

        if (onEditBlock) {
            onEditBlock(updatedTextBlock);
        } else {
            addBlockInArticle(updatedTextBlock);
        }
    }, [addBlockInArticle, blockId, onEditBlock, paragraphs, title]);

    const deleteTextBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
        }
    }, [deleteBlockFromArticle, blockId]);

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();
        if (!isEditPage) {
            enterEditMode();
        } else {
            exitEditMode();
        }
    }, [enterEditMode, exitEditMode, isEditPage, saveTextBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        exitEditMode,
        handleSaveTextBlock,
        handleDeleteTextBlock: deleteTextBlock,
    };
};
