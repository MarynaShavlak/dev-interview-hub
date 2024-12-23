import { useCallback } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';

interface UseTextBlockActionsParams {
    blockId: string;
    title: string;
    paragraphs: string[];
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
    onDeleteTextBlock?: (id: string) => void;
}

export const useTextBlockActions = ({
    blockId,
    title,
    paragraphs,
    addBlockInArticle,
    onEditBlock,
    onDeleteTextBlock,
}: UseTextBlockActionsParams) => {
    const saveBlock = useCallback(() => {
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

    const deleteBlock = useCallback(() => {
        if (onDeleteTextBlock) {
            onDeleteTextBlock(blockId);
        }
    }, [onDeleteTextBlock, blockId]);

    return { saveTextBlock: saveBlock, deleteTextBlock: deleteBlock };
};
