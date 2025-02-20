import { useCallback } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';

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
    console.log('_____edit page', isEditArticlePage);
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hide: exitEditMode,
        show: enterEditMode,
    } = useToggleVisibility();

    const saveTextBlock = useCallback(() => {
        const updatedTextBlock: ArticleTextBlock = {
            id: blockId,
            type: ArticleSection.TEXT,
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
        if (!isEditArticlePage) {
            enterEditMode();
        } else {
            exitEditMode();
        }

        // enterEditMode();
        // }
    }, [enterEditMode, exitEditMode, isEditArticlePage, saveTextBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        exitEditMode,
        handleSaveTextBlock,
        handleDeleteTextBlock: deleteTextBlock,
    };
};
