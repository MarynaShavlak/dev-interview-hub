import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { LiveCode, LiveCodeBlock } from '@/entities/LiveCode';
import { SectionType } from '@/shared/types/sectionTypes';

export interface UseLiveCodeBlocksDisplayReturnType {
    blocks: LiveCodeBlock[];
    insertTextBlock: () => void;
    insertCodeBlock: () => void;
    addBlock: (block: LiveCodeBlock) => void;
    updateBlock: (updatedBlock: LiveCodeBlock) => void;
    removeBlock: (id: string) => void;
    clearBlocks: () => void;
}

export const useLiveCodeBlocksDisplay = (
    isEditArticlePage: boolean,
    formData?: LiveCode,
): UseLiveCodeBlocksDisplayReturnType => {
    const [existingBlocks, setExistingBlocks] = useState<LiveCodeBlock[]>([]);
    const [newBlocks, setNewBlocks] = useState<LiveCodeBlock[]>([]);

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
        const newTextBlock: LiveCodeBlock = {
            id: v4(),
            paragraphs: [],
            title: '',
            type: SectionType.TEXT,
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const insertCodeBlock = useCallback(() => {
        const newBlock: LiveCodeBlock = {
            id: v4(),
            type: SectionType.CODE,
            code: '',
            title: '',
        };
        setNewBlocks((prev) => [...prev, newBlock]);
    }, []);

    const addBlock = useCallback((block: LiveCodeBlock) => {
        setNewBlocks((prev) => [...prev, block]);
    }, []);

    const updateBlock = useCallback(
        (updatedBlock: LiveCodeBlock) => {
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
        insertCodeBlock,
        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    };
};
