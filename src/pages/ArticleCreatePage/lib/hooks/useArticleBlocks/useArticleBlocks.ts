import { useState, useCallback } from 'react';
import { v4 } from 'uuid';
import { ArticleTextBlock, ArticleSection } from '@/entities/Article';

export const useArticleBlocks = () => {
    const [blocks, setBlocks] = useState<ArticleTextBlock[]>([]);

    const createEmptyTextBlock = useCallback(() => {
        const newTextBlock: ArticleTextBlock = {
            id: v4(),
            type: ArticleSection.TEXT,
            paragraphs: [],
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
    }, []);

    const addBlock = useCallback((block: ArticleTextBlock) => {
        setBlocks((prevBlocks) => [...prevBlocks, block]);
    }, []);

    const updateBlock = useCallback((updatedBlock: ArticleTextBlock) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((block) =>
                block.id === updatedBlock.id ? updatedBlock : block,
            ),
        );
    }, []);

    const deleteBlock = useCallback((id: string) => {
        setBlocks((prevBlocks) =>
            prevBlocks.filter((block) => block.id !== id),
        );
    }, []);

    return { blocks, createEmptyTextBlock, addBlock, updateBlock, deleteBlock };
};
