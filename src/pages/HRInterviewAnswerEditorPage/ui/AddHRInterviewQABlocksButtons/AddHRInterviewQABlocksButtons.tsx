import React, { memo } from 'react';

import {
    AddBlocksButtons,
    BlockButtonConfig,
} from '@/features/AddBlocksButtons';

export interface AddHRInterviewQABlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;

    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddHRInterviewQABlocksButtons = memo(
    (props: AddHRInterviewQABlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,

            deleteAllBlocks,
            isSomeBlockAdded,
        } = props;
        const buttons: BlockButtonConfig[] = [
            {
                type: 'text',
                onClick: onAddTextBlockBtnClick,
                translationKey: 'тексту',
            },
        ];
        return (
            <AddBlocksButtons
                buttons={buttons}
                deleteAllBlocks={deleteAllBlocks}
                isSomeBlockAdded={isSomeBlockAdded}
            />
        );
    },
);
