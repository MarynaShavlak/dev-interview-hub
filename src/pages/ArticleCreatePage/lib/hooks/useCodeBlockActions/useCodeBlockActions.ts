import { useCallback } from 'react';
import { ArticleCodeBlock, ArticleSection } from '@/entities/Article';

interface UseCodeBlockActionsParams {
    blockId: string;
    description: string;
    code: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
    onDeleteTextBlock?: (id: string) => void;
}

export const useCodeBlockActions = ({
    blockId,
    description,
    code,
    addBlockInArticle,
    onEditBlock,
    onDeleteTextBlock,
}: UseCodeBlockActionsParams) => {
    const saveBlock = useCallback(() => {
        const updatedTextBlock: ArticleCodeBlock = {
            id: blockId,
            type: ArticleSection.CODE,
            code,
            description,
        };

        if (onEditBlock) {
            onEditBlock(updatedTextBlock);
        } else {
            addBlockInArticle(updatedTextBlock);
        }
    }, [addBlockInArticle, blockId, onEditBlock, code, description]);

    const deleteBlock = useCallback(() => {
        if (onDeleteTextBlock) {
            onDeleteTextBlock(blockId);
        }
    }, [onDeleteTextBlock, blockId]);

    return { saveCodeBlock: saveBlock, deleteCodeBlock: deleteBlock };
};
