import { useCallback } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

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
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hideElement: exitEditMode,
        showElement: enterEditMode,
    } = useToggleVisibility();

    const saveTextBlock = useCallback(() => {
        const updatedTextBlock: ArticleTextBlock = {
            id: blockId,
            type: ArticleSection.TEXT,
            paragraphs,
            title,
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
        exitEditMode();
    }, [exitEditMode, saveTextBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        exitEditMode,
        handleSaveTextBlock,
        handleDeleteTextBlock: deleteTextBlock,
    };
};
