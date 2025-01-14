import { useCallback } from 'react';
import { ArticleCodeBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useCodeBlockActions } from '../useCodeBlockActions/useCodeBlockActions';

interface UseCodeBlockOperationsProps {
    blockId: string;
    title: string;
    code: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
}

export const useCodeBlockOperations = ({
    blockId,
    title,
    code,
    addBlockInArticle,
    deleteBlockFromArticle,
    onEditBlock,
}: UseCodeBlockOperationsProps) => {
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hideElement: deactivateEditMode,
        showElement: activateEditMode,
    } = useToggleVisibility();

    const { saveCodeBlock, deleteCodeBlock } = useCodeBlockActions({
        blockId,
        title,
        code,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const handleSaveCodeBlock = useCallback(() => {
        saveCodeBlock();
        deactivateEditMode();
    }, [deactivateEditMode, saveCodeBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        activateEditMode,
        handleSaveCodeBlock,
        handleDeleteCodeBlock: deleteCodeBlock,
    };
};
