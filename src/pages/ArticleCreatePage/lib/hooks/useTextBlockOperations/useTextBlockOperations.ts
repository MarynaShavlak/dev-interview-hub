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
    const { isVisible: isEditing, toggleVisibility: toggleEditMode } =
        useToggleVisibility();

    const saveTextBlock = useCallback(() => {
        const updatedBlock: ArticleTextBlock = {
            id: blockId,
            type: ArticleSection.TEXT,
            title,
            paragraphs,
        };

        if (onEditBlock) {
            onEditBlock(updatedBlock);
        } else {
            addBlockInArticle(updatedBlock);
        }
    }, [blockId, title, paragraphs, addBlockInArticle, onEditBlock]);

    const deleteTextBlock = useCallback(() => {
        deleteBlockFromArticle(blockId);
    }, [blockId, deleteBlockFromArticle]);

    return {
        isEditing,
        toggleEditMode,
        saveTextBlock,
        deleteTextBlock,
    };
};
