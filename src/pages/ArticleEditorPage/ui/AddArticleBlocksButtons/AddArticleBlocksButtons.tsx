import React, { memo } from 'react';

import {
    AddBlocksButtons,
    BlockButtonConfig,
} from '@/features/AddBlocksButtons';

export interface AddArticleBlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;
    onAddCodeBlockBtnClick: () => void;
    onAddImageBlockBtnClick: () => void;
    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddArticleBlocksButtons = memo(
    (props: AddArticleBlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,
            onAddImageBlockBtnClick,
            onAddCodeBlockBtnClick,
            deleteAllBlocks,
            isSomeBlockAdded,
        } = props;
        const buttons: BlockButtonConfig[] = [
            {
                type: 'text',
                onClick: onAddTextBlockBtnClick,
                translationKey: 'тексту',
            },
            {
                type: 'code',
                onClick: onAddCodeBlockBtnClick,
                translationKey: 'коду',
            },
            {
                type: 'image',
                onClick: onAddImageBlockBtnClick,
                translationKey: 'зображення',
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
