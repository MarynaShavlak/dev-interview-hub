import React from 'react';
import { ArticleBlock, ArticleSection } from '@/entities/Article';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';
import { CodeBlockEditor } from '@/widgets/CodeBlockEditor';
import { ImageBlockEditor } from '@/widgets/ImageBlockEditor';

interface BlockRendererProps {
    block: ArticleBlock;
    addBlockInArticle: (block: ArticleBlock) => void;
    deleteBlockFromArticle: (blockId: string) => void;
    onEditBlock: (block: ArticleBlock) => void;
}

export const BlockRenderer = (props: BlockRendererProps) => {
    const { block, addBlockInArticle, deleteBlockFromArticle, onEditBlock } =
        props;

    switch (block.type) {
        case ArticleSection.TEXT:
            return (
                <TextBlockEditor
                    block={block}
                    addBlockInArticle={addBlockInArticle}
                    deleteBlockFromArticle={deleteBlockFromArticle}
                    onEditBlock={onEditBlock}
                />
            );
        case ArticleSection.CODE:
            return (
                <CodeBlockEditor
                    block={block}
                    addBlockInArticle={addBlockInArticle}
                    deleteBlockFromArticle={deleteBlockFromArticle}
                    onEditBlock={onEditBlock}
                />
            );
        case ArticleSection.IMAGE:
            return (
                <ImageBlockEditor
                    block={block}
                    addBlockInArticle={addBlockInArticle}
                    deleteBlockFromArticle={deleteBlockFromArticle}
                    onEditBlock={onEditBlock}
                />
            );
        default:
            return null;
    }
};
