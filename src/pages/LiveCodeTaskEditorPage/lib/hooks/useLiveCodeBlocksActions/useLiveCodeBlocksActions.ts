import { useCallback } from 'react';

import { useLiveCodeFormState } from '../useLiveCodeFormState/useLiveCodeFormState';
import { LiveCodeBlock } from '@/entities/LiveCode';
import { AddBlocksFormProps } from '../../../ui/Blocks/Blocks';

export const useLiveCodeBlocksActions = (
    blockActions: AddBlocksFormProps['blockActions'],
) => {
    const { addBlock, updateBlock, removeBlock } = blockActions;

    const { onDeleteBlock, onChangeBlocks } = useLiveCodeFormState();

    const handleDeleteLiveCodeBlock = useCallback(
        (blockId: string) => {
            removeBlock(blockId);
            onDeleteBlock(blockId);
        },
        [removeBlock, onDeleteBlock],
    );

    const handleUpdateLiveCodeBlock = useCallback(
        (updatedBlock: LiveCodeBlock) => {
            updateBlock(updatedBlock);
            onChangeBlocks(updatedBlock);
        },
        [onChangeBlocks, updateBlock],
    );

    const handleAddLiveCodeBlock = useCallback(
        (newBlock: LiveCodeBlock) => {
            addBlock(newBlock);
            onChangeBlocks(newBlock);
        },
        [addBlock, onChangeBlocks],
    );

    return {
        handleAddLiveCodeBlock,
        handleUpdateLiveCodeBlock,
        handleDeleteLiveCodeBlock,
    };
};
