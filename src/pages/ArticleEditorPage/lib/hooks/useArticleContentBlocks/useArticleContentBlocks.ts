import { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 } from 'uuid';
import {
    ArticleTextBlock,
    ArticleSection,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    Article,
} from '@/entities/Article';

export const useArticleContentBlocks = (
    isEditArticlePage: boolean,
    formData?: Article,
) => {
    // console.log('_____', formData);
    const existingBlocks = useMemo(() => {
        return formData?.blocks || [];
    }, [formData?.blocks]);
    const [blocks, setBlocks] = useState<ArticleBlock[]>(() => {
        if (isEditArticlePage && formData?.blocks) {
            return formData.blocks;
        }
        return [];
    });
    const [isInitialized, setIsInitialized] = useState(false);
    console.log('existingBlocks', existingBlocks);
    console.log('formData', formData);

    useEffect(() => {
        if (isEditArticlePage && formData?.blocks && !isInitialized) {
            setBlocks(formData.blocks);
            setIsInitialized(true);
        }
    }, [formData, isEditArticlePage, isInitialized]);

    console.log('blocks,', blocks);
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
        setBlocks((prevBlocks) => {
            const updatedBlocks = prevBlocks.filter((block) => block.id !== id);
            return updatedBlocks;
        });
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
