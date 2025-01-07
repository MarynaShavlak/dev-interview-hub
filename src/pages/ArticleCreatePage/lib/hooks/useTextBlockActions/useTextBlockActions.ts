import { useCallback } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { useArticleEditor } from '../useArticleEditor/useArticleEditor';

interface UseTextBlockActionsParams {
    blockId: string;
    title: string;
    paragraphs: string[];
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle?: (id: string) => void;
}

export const useTextBlockActions = ({
    blockId,
    title,
    paragraphs,
    addBlockInArticle,
    onEditBlock,
    deleteBlockFromArticle,
}: UseTextBlockActionsParams) => {
    const { formData, onDeleteBlock, onChangeBlocks } = useArticleEditor();
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
        onChangeBlocks(updatedTextBlock);
    }, [
        addBlockInArticle,
        blockId,
        onChangeBlocks,
        onEditBlock,
        paragraphs,
        title,
    ]);

    const deleteBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
            onDeleteBlock(blockId);
        }
    }, [deleteBlockFromArticle, blockId, onDeleteBlock]);

    return { saveTextBlock: saveBlock, deleteTextBlock: deleteBlock };
};
