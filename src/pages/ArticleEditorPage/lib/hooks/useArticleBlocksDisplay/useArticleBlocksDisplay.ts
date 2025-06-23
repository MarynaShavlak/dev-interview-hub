import { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 } from 'uuid';
import {
    ArticleTextBlock,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    Article,
} from '@/entities/Article';
import { SectionType } from '@/shared/types/sectionTypes';

export interface UseArticleBlocksDisplayReturnType {
    blocks: ArticleBlock[];
    insertTextBlock: () => void;
    insertCodeBlock: () => void;
    insertImageBlock: () => void;
    addBlock: (block: ArticleBlock) => void;
    updateBlock: (updatedBlock: ArticleBlock) => void;
    removeBlock: (id: string) => void;
    clearBlocks: () => void;
}

export const useArticleBlocksDisplay = (
    isEditArticlePage: boolean,
    formData?: Article,
): UseArticleBlocksDisplayReturnType => {
    // Track existing and new blocks separately
    const [existingBlocks, setExistingBlocks] = useState<ArticleBlock[]>([]);
    const [newBlocks, setNewBlocks] = useState<ArticleBlock[]>([]);

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
        const newTextBlock: ArticleTextBlock = {
            id: v4(),
            type: SectionType.TEXT,
            paragraphs: [],
            title: '',
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const insertCodeBlock = useCallback(() => {
        const newBlock: ArticleCodeBlock = {
            id: v4(),
            type: SectionType.CODE,
            code: '',
            title: '',
        };
        setNewBlocks((prev) => [...prev, newBlock]);
    }, []);

    const insertImageBlock = useCallback(() => {
        const newTextBlock: ArticleImageBlock = {
            id: v4(),
            type: SectionType.IMAGE,
            src: '',
            title: '',
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const addBlock = useCallback((block: ArticleBlock) => {
        setNewBlocks((prev) => [...prev, block]);
    }, []);

    const updateBlock = useCallback(
        (updatedBlock: ArticleBlock) => {
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
        insertImageBlock,
        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    };
};
