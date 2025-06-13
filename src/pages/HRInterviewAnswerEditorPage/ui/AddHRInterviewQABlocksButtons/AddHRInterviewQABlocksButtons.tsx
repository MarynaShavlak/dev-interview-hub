import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddHRInterviewQABlocksButtonsRedesigned } from './AddHRInterviewQABlocksButtonsRedesigned/AddHRInterviewQABlocksButtonsRedesigned';
import { AddHRInterviewQABlocksButtonsDeprecated } from './AddHRInterviewQABlocksButtonsDeprecated/AddHRInterviewQABlocksButtonsDeprecated';

export interface AddHRInterviewQABlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;

    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddHRInterviewQABlocksButtons = memo(
    (props: AddHRInterviewQABlocksButtonsProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AddHRInterviewQABlocksButtonsRedesigned {...props} />}
                off={<AddHRInterviewQABlocksButtonsDeprecated {...props} />}
            />
        );
    },
);
