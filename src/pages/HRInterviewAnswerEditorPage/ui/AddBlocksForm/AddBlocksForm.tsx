import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddBlocksFormRedesigned } from './AddBlocksFormRedesigned/AddBlocksFormRedesigned';
import { AddBlocksFormDeprecated } from './AddBlocksFormDeprecated/AddBlocksFormDeprecated';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';

export interface AddBlocksFormProps {
    index: number;
    blocks: HRInterviewQABlock[];
    blockActions: {
        insertTextBlock: () => void;
        addBlock: (block: HRInterviewQABlock) => void;
        updateBlock: (updatedBlock: HRInterviewQABlock) => void;
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
