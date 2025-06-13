import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { HRInterviewQA, HRInterviewQABlock } from '@/entities/HRInterviewQA';
import { SectionType } from '@/shared/types/sectionTypes';

export interface UseHRInterviewQABlocksDisplayReturnType {
    blocks: HRInterviewQABlock[];
    insertTextBlock: () => void;
    addBlock: (block: HRInterviewQABlock) => void;
    updateBlock: (updatedBlock: HRInterviewQABlock) => void;
    removeBlock: (id: string) => void;
    clearBlocks: () => void;
}

export const useHRInterviewQABlocksDisplay = (
    isEditArticlePage: boolean,
    formData?: HRInterviewQA,
): UseHRInterviewQABlocksDisplayReturnType => {
    // Track existing and new blocks separately
    const [existingBlocks, setExistingBlocks] = useState<HRInterviewQABlock[]>(
        [],
    );
    const [newBlocks, setNewBlocks] = useState<HRInterviewQABlock[]>([]);

    // Update existing blocks when formData changes
    useEffect(() => {
        if (isEditArticlePage && formData?.blocks) {
            setExistingBlocks(formData.blocks);
        }
    }, [formData, isEditArticlePage]);

    const blocks = useMemo(() => {
        const existingBlockIds = new Set(
            existingBlocks.map((block) => block.id),
        );
        const uniqueNewBlocks = newBlocks.filter(
            (block) => !existingBlockIds.has(block.id),
        );
        return [...existingBlocks, ...uniqueNewBlocks];
    }, [existingBlocks, newBlocks]);

    const insertTextBlock = useCallback(() => {
        const newTextBlock: HRInterviewQABlock = {
            id: v4(),
            paragraphs: [],
            title: '',
            type: SectionType.TEXT,
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const addBlock = useCallback((block: HRInterviewQABlock) => {
        setNewBlocks((prev) => [...prev, block]);
    }, []);

    const updateBlock = useCallback(
        (updatedBlock: HRInterviewQABlock) => {
            // Check if the block is in existing blocks
            const isExistingBlock = existingBlocks.some(
                (block) => block.id === updatedBlock.id,
            );

            if (isExistingBlock) {
                setExistingBlocks((prev) =>
                    prev.map((block) =>
                        block.id === updatedBlock.id ? updatedBlock : block,
                    ),
                );
            } else {
                setNewBlocks((prev) =>
                    prev.map((block) =>
                        block.id === updatedBlock.id ? updatedBlock : block,
                    ),
                );
            }
        },
        [existingBlocks],
    );

    const removeBlock = useCallback(
        (id: string) => {
            // Check if the block is in existing blocks
            const isExistingBlock = existingBlocks.some(
                (block) => block.id === id,
            );

            if (isExistingBlock) {
                setExistingBlocks((prev) =>
                    prev.filter((block) => block.id !== id),
                );
            } else {
                setNewBlocks((prev) => prev.filter((block) => block.id !== id));
            }
        },
        [existingBlocks],
    );

    const clearBlocks = useCallback(() => {
        setExistingBlocks([]);
        setNewBlocks([]);
    }, []);

    return {
        blocks,
        insertTextBlock,

        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    };
};
