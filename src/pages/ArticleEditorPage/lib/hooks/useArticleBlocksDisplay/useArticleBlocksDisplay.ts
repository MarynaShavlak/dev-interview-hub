import { useState, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';
import {
    ArticleTextBlock,
    ArticleSection,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    Article,
} from '@/entities/Article';

export const useArticleBlocksDisplay = (
    isEditArticlePage: boolean,
    initialArticle?: Article,
) => {
    const [blocks, setBlocks] = useState<ArticleBlock[]>(() => {
        if (isEditArticlePage && initialArticle?.blocks) {
            return initialArticle.blocks;
        }
        return [];
    });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isEditArticlePage && initialArticle?.blocks && !isInitialized) {
            setBlocks(initialArticle.blocks);
            setIsInitialized(true);
        }
    }, [initialArticle, isEditArticlePage, isInitialized]);

    const insertTextBlock = useCallback(() => {
        const newTextBlock: ArticleTextBlock = {
            id: v4(),
            type: ArticleSection.TEXT,
            paragraphs: [],
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
    }, []);

    const insertCodeBlock = useCallback(() => {
        const newCodeBlock: ArticleCodeBlock = {
            id: v4(),
            type: ArticleSection.CODE,
            code: '',
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newCodeBlock]);
    }, []);

    const insertImageBlock = useCallback(() => {
        const newImageBlock: ArticleImageBlock = {
            id: v4(),
            type: ArticleSection.IMAGE,
            src: '',
            title: '',
        };
        setBlocks((prevBlocks) => [...prevBlocks, newImageBlock]);
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

    const removeBlock = useCallback((id: string) => {
        setBlocks((prevBlocks) => {
            const updatedBlocks = prevBlocks.filter((block) => block.id !== id);
            return updatedBlocks;
        });
    }, []);

    const clearBlocks = useCallback(() => {
        setBlocks([]);
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
