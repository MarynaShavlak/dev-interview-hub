import { useCallback } from 'react';
import { ArticleCodeBlock, ArticleSection } from '@/entities/Article';
import { useCreateArticle } from '../useCreateArticle/useCreateArticle';

interface UseCodeBlockActionsParams {
    blockId: string;
    description: string;
    code: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle?: (id: string) => void;
}

export const useCodeBlockActions = ({
    blockId,
    description,
    code,
    addBlockInArticle,
    onEditBlock,
    deleteBlockFromArticle,
}: UseCodeBlockActionsParams) => {
    const { formData, onChangeBlocks, onDeleteBlock } = useCreateArticle();
    const saveBlock = useCallback(() => {
        const updatedBlock: ArticleCodeBlock = {
            id: blockId,
            type: ArticleSection.CODE,
            code,
            description,
        };

        if (onEditBlock) {
            onEditBlock(updatedBlock);
        } else {
            addBlockInArticle(updatedBlock);
        }
        onChangeBlocks(updatedBlock);
    }, [
        blockId,
        code,
        description,
        onEditBlock,
        onChangeBlocks,
        addBlockInArticle,
    ]);

    const deleteBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
            onDeleteBlock(blockId);
        }
    }, [deleteBlockFromArticle, blockId, onDeleteBlock]);

    return { saveCodeBlock: saveBlock, deleteCodeBlock: deleteBlock };
};
