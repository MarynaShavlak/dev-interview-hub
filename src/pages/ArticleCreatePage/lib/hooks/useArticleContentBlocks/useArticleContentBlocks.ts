import { useState, useCallback } from 'react';
import { v4 } from 'uuid';
import {
    ArticleTextBlock,
    ArticleSection,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
} from '@/entities/Article';

export const useArticleContentBlocks = () => {
    const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

    const createEmptyTextBlock = useCallback(() => {
        const newTextBlock: ArticleTextBlock = {
            id: v4(),
            type: ArticleSection.TEXT,
            paragraphs: [],
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
    }, []);

    const createEmptyCodeBlock = useCallback(() => {
        const newTextBlock: ArticleCodeBlock = {
            id: v4(),
            type: ArticleSection.CODE,
            code: '',
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
    }, []);

    const createEmptyImageBlock = useCallback(() => {
        const newTextBlock: ArticleImageBlock = {
            id: v4(),
            type: ArticleSection.IMAGE,
            src: '',
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
    }, []);

    const addBlock = useCallback((block: ArticleBlock) => {
        setBlocks((prevBlocks) => [...prevBlocks, block]);
    }, []);

    const updateBlock = useCallback((updatedBlock: ArticleBlock) => {
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

    const deleteAllBlocks = useCallback(() => {
        setBlocks([]);
    }, []);

    return {
        blocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteAllBlocks,
    };
};
