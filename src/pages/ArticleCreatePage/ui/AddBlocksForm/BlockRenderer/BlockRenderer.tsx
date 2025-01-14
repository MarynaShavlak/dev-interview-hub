import React from 'react';
import { ArticleBlock, ArticleSection } from '@/entities/Article';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';
import { CodeBlockEditor } from '../../CodeBlockEditor/CodeBlockEditor';
import { ImageBlockEditor } from '../../ImageBlockEditor/ImageBlockEditor';

interface BlockRendererProps {
    block: ArticleBlock;
    addBlockInArticle: (block: ArticleBlock) => void;
    deleteBlockFromArticle: (blockId: string) => void;
    onEditBlock: (block: ArticleBlock) => void;
}

export const BlockRenderer = (props: BlockRendererProps) => {
    const { block, addBlockInArticle, deleteBlockFromArticle, onEditBlock } =
        props;
    // console.log('block', block);
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
                    blockId={block.id}
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
