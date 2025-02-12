import React, { memo } from 'react';
import { ArticleBlock } from '@/entities/Article';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddBlocksFormRedesigned } from './AddBlocksFormRedesigned/AddBlocksFormRedesigned';
import { AddBlocksFormDeprecated } from './AddBlocksFormDeprecated/AddBlocksFormDeprecated';

export interface AddBlocksFormProps {
    index: number;
    blocks: ArticleBlock[];
    blockActions: {
        insertTextBlock: () => void;
        insertCodeBlock: () => void;
        insertImageBlock: () => void;
        addBlock: (block: ArticleBlock) => void;
        updateBlock: (updatedBlock: ArticleBlock) => void;
        removeBlock: (id: string) => void;
        clearBlocks: () => void;
    };
}
export const AddBlocksForm = memo((props: AddBlocksFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddBlocksFormRedesigned {...props} />}
            off={<AddBlocksFormDeprecated {...props} />}
        />
    );
});
