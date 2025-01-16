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

export const useArticleBlocksDisplay = (
    isEditArticlePage: boolean,
    formData?: Article,
) => {
    // Track existing and new blocks separately
    const [existingBlocks, setExistingBlocks] = useState<ArticleBlock[]>([]);
    const [newBlocks, setNewBlocks] = useState<ArticleBlock[]>([]);

    // Update existing blocks when formData changes
    useEffect(() => {
        if (isEditArticlePage && formData?.blocks) {
            setExistingBlocks(formData.blocks);
        }
    }, [formData, isEditArticlePage]);

    // Combine existing and new blocks for the final blocks array
    // const blocks = useMemo(() => {
    //     console.log('___existingbLOCK___', existingBlocks);
    //     console.log('___newBlocks___', newBlocks);
    //     return [...existingBlocks, ...newBlocks];
    // }, [existingBlocks, newBlocks]);
    // console.log('blocks', blocks);

    const blocks = useMemo(() => {
        console.log('___existingbLOCK___', existingBlocks);
        console.log('___newBlocks___', newBlocks);
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
            type: ArticleSection.TEXT,
            paragraphs: [],
            title: '',
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const insertCodeBlock = useCallback(() => {
        const newTextBlock: ArticleCodeBlock = {
            id: v4(),
            type: ArticleSection.CODE,
            code: '',
            title: '',
        };
        setNewBlocks((prev) => [...prev, newTextBlock]);
    }, []);

    const insertImageBlock = useCallback(() => {
        const newTextBlock: ArticleImageBlock = {
            id: v4(),
            type: ArticleSection.IMAGE,
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
            console.log('updatedBlock block', updatedBlock);
            // Check if the block is in existing blocks
            const isExistingBlock = existingBlocks.some(
                (block) => block.id === updatedBlock.id,
            );
            console.log('isExistingBlock', isExistingBlock);

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
        insertCodeBlock,
        insertImageBlock,
        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    };
};

// _____//____________________________________________________________
// import { useCallback, useEffect, useState } from 'react';
// import { v4 } from 'uuid';
// import {
//     ArticleTextBlock,
//     ArticleSection,
//     ArticleBlock,
//     ArticleCodeBlock,
//     ArticleImageBlock,
//     Article,
// } from '@/entities/Article';
//
// export const useArticleBlocksDisplay = (
//     isEditArticlePage: boolean,
//     initialArticle?: Article,
// ) => {
//     console.log(isEditArticlePage, initialArticle);
//     // const [blocks, setBlocks] = useState<ArticleBlock[]>(() => {
//     //     if (isEditArticlePage && initialArticle?.blocks) {
//     //         return initialArticle.blocks;
//     //     }
//     //     return [];
//     // });
//     // const [isInitialized, setIsInitialized] = useState(false);
//     //
//     // useEffect(() => {
//     //     if (isEditArticlePage && initialArticle?.blocks && !isInitialized) {
//     //         setBlocks(initialArticle.blocks);
//     //         setIsInitialized(true);
//     //     }
//     // }, [initialArticle, isEditArticlePage, isInitialized]);
//
//     // ___________________________________________________________________________
//
//     // const existingBlocks = useMemo(() => {
//     //     return initialArticle?.blocks || [];
//     // }, [initialArticle?.blocks]);
//     //
//     // // Track if we've loaded the initial data
//     // const initialLoadDone = useRef(false);
//     //
//     // // Initialize blocks state
//     // const [blocks, setBlocks] = useState<ArticleBlock[]>(
//     //     isEditArticlePage ? existingBlocks : [],
//     // );
//     //
//     // // Update blocks only on initial load or when initialArticle changes significantly
//     // useEffect(() => {
//     //     if (isEditArticlePage && initialArticle?.blocks) {
//     //         if (!initialLoadDone.current) {
//     //             setBlocks(initialArticle.blocks);
//     //             initialLoadDone.current = true;
//     //         }
//     //     }
//     // }, [initialArticle, isEditArticlePage]);
//
//     // ___________________________________________________________________________
//
//     const [blocks, setBlocks] = useState<ArticleBlock[]>([]);
//
//     // Update blocks whenever initialArticle changes and we're in edit mode
//     useEffect(() => {
//         if (
//             isEditArticlePage &&
//             initialArticle?.blocks &&
//             initialArticle.blocks.length > 0
//         ) {
//             setBlocks(initialArticle.blocks);
//         }
//     }, [initialArticle, isEditArticlePage]);
//
//     const insertTextBlock = useCallback(() => {
//         const newTextBlock: ArticleTextBlock = {
//             id: v4(),
//             type: ArticleSection.TEXT,
//             paragraphs: [],
//             title: '',
//         };
//         setBlocks((prevBlocks) => [...prevBlocks, newTextBlock]);
//     }, []);
//
//     const insertCodeBlock = useCallback(() => {
//         const newCodeBlock: ArticleCodeBlock = {
//             id: v4(),
//             type: ArticleSection.CODE,
//             code: '',
//             title: '',
//         };
//         setBlocks((prevBlocks) => [...prevBlocks, newCodeBlock]);
//     }, []);
//
//     const insertImageBlock = useCallback(() => {
//         const newImageBlock: ArticleImageBlock = {
//             id: v4(),
//             type: ArticleSection.IMAGE,
//             src: '',
//             title: '',
//         };
//         setBlocks((prevBlocks) => [...prevBlocks, newImageBlock]);
//     }, []);
//
//     const addBlock = useCallback((block: ArticleBlock) => {
//         setBlocks((prevBlocks) => [...prevBlocks, block]);
//     }, []);
//
//     const updateBlock = useCallback((updatedBlock: ArticleBlock) => {
//         setBlocks((prevBlocks) =>
//             prevBlocks.map((block) =>
//                 block.id === updatedBlock.id ? updatedBlock : block,
//             ),
//         );
//     }, []);
//
//     const removeBlock = useCallback((id: string) => {
//         setBlocks((prevBlocks) => {
//             const updatedBlocks = prevBlocks.filter((block) => block.id !== id);
//             return updatedBlocks;
//         });
//     }, []);
//
//     const clearBlocks = useCallback(() => {
//         setBlocks([]);
//     }, []);
//
//     return {
//         blocks,
//         insertTextBlock,
//         insertCodeBlock,
//         insertImageBlock,
//         addBlock,
//         updateBlock,
//         removeBlock,
//         clearBlocks,
//     };
// };
