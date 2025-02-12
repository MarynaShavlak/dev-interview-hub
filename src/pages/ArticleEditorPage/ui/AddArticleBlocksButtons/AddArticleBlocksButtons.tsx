import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddArticleBlocksButtonsRedesigned } from './AddArticleBlocksButtonsRedesigned/AddArticleBlocksButtonsRedesigned';
import { AddArticleBlocksButtonsDeprecated } from './AddArticleBlocksButtonsDeprecated/AddArticleBlocksButtonsDeprecated';

export interface AddArticleBlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;
    onAddCodeBlockBtnClick: () => void;
    onAddImageBlockBtnClick?: () => void;
    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddArticleBlocksButtons = memo(
    (props: AddArticleBlocksButtonsProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AddArticleBlocksButtonsRedesigned {...props} />}
                off={<AddArticleBlocksButtonsDeprecated {...props} />}
            />
        );
    },
);
