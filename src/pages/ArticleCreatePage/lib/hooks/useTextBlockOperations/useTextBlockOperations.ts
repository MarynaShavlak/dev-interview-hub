import { useCallback } from 'react';
import { ArticleTextBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useTextBlockActions } from '../useTextBlockActions/useTextBlockActions';

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
        hideElement: deactivateEditMode,
        showElement: activateEditMode,
    } = useToggleVisibility();

    const { saveTextBlock, deleteTextBlock } = useTextBlockActions({
        blockId,
        title,
        paragraphs,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();
        deactivateEditMode();
    }, [deactivateEditMode, saveTextBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        activateEditMode,
        handleSaveTextBlock,
        handleDeleteTextBlock: deleteTextBlock,
    };
};
