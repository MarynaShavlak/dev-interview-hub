import { useCallback } from 'react';
import { ArticleCodeBlock, ArticleSection } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';

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
    const isEditArticlePage = useIsEditArticlePage();
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hide: exitEditMode,
        show: enterEditMode,
    } = useToggleVisibility();

    const saveCodeBlock = useCallback(() => {
        const updatedBlock: ArticleCodeBlock = {
            id: blockId,
            type: ArticleSection.CODE,
            code: code.trim(),
            title,
        };

        if (onEditBlock) {
            onEditBlock(updatedBlock);
        } else {
            addBlockInArticle(updatedBlock);
        }
    }, [blockId, code, title, onEditBlock, addBlockInArticle]);

    const deleteCodeBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
        }
    }, [deleteBlockFromArticle, blockId]);

    const handleSaveCodeBlock = useCallback(() => {
        saveCodeBlock();
        if (!isEditArticlePage) {
            enterEditMode();
        } else {
            exitEditMode();
        }
    }, [enterEditMode, exitEditMode, isEditArticlePage, saveCodeBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        exitEditMode,
        handleSaveCodeBlock,
        handleDeleteCodeBlock: deleteCodeBlock,
    };
};
