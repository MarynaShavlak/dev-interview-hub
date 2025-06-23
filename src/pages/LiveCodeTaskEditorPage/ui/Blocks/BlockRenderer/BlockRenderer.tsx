import React from 'react';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';
import { CodeBlockEditor } from '@/widgets/CodeBlockEditor';
import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeBlock } from '@/entities/LiveCode';

interface BlockRendererProps {
    block: LiveCodeBlock;
    addBlockInArticle: (block: LiveCodeBlock) => void;
    deleteBlockFromArticle: (blockId: string) => void;
    onEditBlock: (block: LiveCodeBlock) => void;
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

        default:
            return null;
    }
};
