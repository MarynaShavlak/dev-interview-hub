import { useCallback } from 'react';
import { ArticleCodeBlock, ArticleSection } from '@/entities/Article';
import { useArticleEditor } from '../../../../../pages/ArticleCreatePage/lib/hooks/useArticleEditor/useArticleEditor';

interface UseCodeBlockActionsParams {
    blockId: string;
    title: string;
    code: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle?: (id: string) => void;
}

export const useCodeBlockActions = ({
    blockId,
    title,
    code,
    addBlockInArticle,
    onEditBlock,
    deleteBlockFromArticle,
}: UseCodeBlockActionsParams) => {
    const { formData, onChangeBlocks, onDeleteBlock } = useArticleEditor();
    const saveBlock = useCallback(() => {
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
        onChangeBlocks(updatedBlock);
    }, [blockId, code, title, onEditBlock, onChangeBlocks, addBlockInArticle]);

    const deleteBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
            onDeleteBlock(blockId);
        }
    }, [deleteBlockFromArticle, blockId, onDeleteBlock]);

    return { saveCodeBlock: saveBlock, deleteCodeBlock: deleteBlock };
};
