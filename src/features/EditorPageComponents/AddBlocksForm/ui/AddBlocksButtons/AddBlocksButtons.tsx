import React, { memo } from 'react';
import { BlockButtonConfig } from '../../model/types/btnConfig';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddBlocksButtonsRedesigned } from './AddBlocksButtonsRedesigned/AddBlocksButtonsRedesigned';
import { AddBlocksButtonsDeprecated } from './AddBlocksButtonsDeprecated/AddBlocksButtonsDeprecated';

export interface AddBlocksButtonsProps {
    buttons: BlockButtonConfig[];
    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddBlocksButtons = memo((props: AddBlocksButtonsProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddBlocksButtonsRedesigned {...props} />}
            off={<AddBlocksButtonsDeprecated {...props} />}
        />
    );
});
