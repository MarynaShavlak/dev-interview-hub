import { useCallback } from 'react';
import { AddBlocksFormProps } from '../../../ui/Blocks/Blocks';
import { useHRInterviewQAFormState } from '../useHRInterviewQAFormState/useHRInterviewQAFormState';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';

export const useHRInterviewQABlocksActions = (
    blockActions: AddBlocksFormProps['blockActions'],
) => {
    const { addBlock, updateBlock, removeBlock } = blockActions;

    const { onDeleteBlock, onChangeBlocks } = useHRInterviewQAFormState();

    const handleDeleteHRInterviewQABlock = useCallback(
        (blockId: string) => {
            removeBlock(blockId);
            onDeleteBlock(blockId);
        },
        [removeBlock, onDeleteBlock],
    );

    const handleUpdateHRInterviewQABlock = useCallback(
        (updatedBlock: HRInterviewQABlock) => {
            updateBlock(updatedBlock);
            onChangeBlocks(updatedBlock);
        },
        [onChangeBlocks, updateBlock],
    );

    const handleAddHRInterviewQABlock = useCallback(
        (newBlock: HRInterviewQABlock) => {
            addBlock(newBlock);
            onChangeBlocks(newBlock);
        },
        [addBlock, onChangeBlocks],
    );

    return {
        handleAddHRInterviewQABlock,
        handleUpdateHRInterviewQABlock,
        handleDeleteHRInterviewQABlock,
    };
};
