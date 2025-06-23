import { useCallback } from 'react';
import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
import { ArticleBlock } from '@/entities/Article';
import { AddBlocksFormProps } from '../../../ui/Blocks/Blocks';

export const useArticleBlocksActions = (
    blockActions: AddBlocksFormProps['blockActions'],
) => {
    const { addBlock, updateBlock, removeBlock } = blockActions;

    const { onDeleteBlock, onChangeBlocks } = useArticleFormState();

    const handleDeleteArticleBlock = useCallback(
        (blockId: string) => {
            removeBlock(blockId);
            onDeleteBlock(blockId);
        },
        [removeBlock, onDeleteBlock],
    );

    const handleUpdateArticleBlock = useCallback(
        (updatedBlock: ArticleBlock) => {
            updateBlock(updatedBlock);
            onChangeBlocks(updatedBlock);
        },
        [onChangeBlocks, updateBlock],
    );

    const handleAddArticleBlock = useCallback(
        (newBlock: ArticleBlock) => {
            addBlock(newBlock);
            onChangeBlocks(newBlock);
        },
        [addBlock, onChangeBlocks],
    );

    return {
        handleAddArticleBlock,
        handleUpdateArticleBlock,
        handleDeleteArticleBlock,
    };
};
