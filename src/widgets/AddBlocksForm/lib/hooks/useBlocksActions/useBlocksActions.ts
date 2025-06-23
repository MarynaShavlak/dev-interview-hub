import { useCallback } from 'react';
import { AddBlocksFormProps } from '../../../model/types/blockForm';

interface UseBlocksActionsProps<T> {
    blockActions: AddBlocksFormProps<T>['blockActions'];
    onDeleteBlock: (blockId: string) => void;
    onChangeBlocks: (block: T) => void;
}

export const useBlocksActions = <T>({
    blockActions,
    onDeleteBlock,
    onChangeBlocks,
}: UseBlocksActionsProps<T>) => {
    const { addBlock, updateBlock, removeBlock } = blockActions;

    const handleDeleteBlock = useCallback(
        (blockId: string) => {
            removeBlock(blockId);
            onDeleteBlock(blockId);
        },
        [removeBlock, onDeleteBlock],
    );

    const handleUpdateBlock = useCallback(
        (updatedBlock: T) => {
            updateBlock(updatedBlock);
            onChangeBlocks(updatedBlock);
        },
        [onChangeBlocks, updateBlock],
    );

    const handleAddBlock = useCallback(
        (newBlock: T) => {
            addBlock(newBlock);
            onChangeBlocks(newBlock);
        },
        [addBlock, onChangeBlocks],
    );

    return {
        handleAddBlock,
        handleUpdateBlock,
        handleDeleteBlock,
    };
};
