import React from 'react';
import { ArticleBlock } from '@/entities/Article';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';
import { CodeBlockEditor } from '@/widgets/CodeBlockEditor';
import { ImageBlockEditor } from '@/widgets/ImageBlockEditor';
import { SectionType } from '@/shared/types/sectionTypes';

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
        case SectionType.TEXT:
            return (
                <TextBlockEditor
                    block={block}
                    addBlockInArticle={addBlockInArticle}
                    deleteBlockFromArticle={deleteBlockFromArticle}
                    onEditBlock={onEditBlock}
                />
            );
        case SectionType.CODE:
            return (
                <CodeBlockEditor
                    block={block}
                    addBlockInArticle={addBlockInArticle}
                    deleteBlockFromArticle={deleteBlockFromArticle}
                    onEditBlock={onEditBlock}
                />
            );
        case SectionType.IMAGE:
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
