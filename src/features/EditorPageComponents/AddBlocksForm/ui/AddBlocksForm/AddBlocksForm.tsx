import React from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddBlocksFormRedesigned } from './AddBlocksFormRedesigned/AddBlocksFormRedesigned';
import { AddBlocksFormDeprecated } from './AddBlocksFormDeprecated/AddBlocksFormDeprecated';

type BaseBlockActions<T extends { id: string }> = {
    insertTextBlock: () => void;
    addBlock: (block: T) => void;
    updateBlock: (updatedBlock: T) => void;
    removeBlock: (id: string) => void;
    clearBlocks: () => void;
};

export type ArticleBlockActions<T extends { id: string }> =
    BaseBlockActions<T> & {
        insertCodeBlock: () => void;
        insertImageBlock: () => void;
    };

export type LiveCodeBlockActions<T extends { id: string }> =
    BaseBlockActions<T> & {
        insertCodeBlock: () => void;
    };

export type HrInterviewQABlockActions<T extends { id: string }> =
    BaseBlockActions<T>;

export type AddBlocksFormProps<T extends { id: string }> =
    | {
          entityType: 'article';
          isSomeBlockAdded: boolean;
          blockActions: ArticleBlockActions<T>;
      }
    | {
          entityType: 'liveCode';
          isSomeBlockAdded: boolean;
          blockActions: LiveCodeBlockActions<T>;
      }
    | {
          entityType: 'hrInterviewQA';
          isSomeBlockAdded: boolean;
          blockActions: HrInterviewQABlockActions<T>;
      };

export const AddBlocksForm = <T extends { id: string }>(
    props: AddBlocksFormProps<T>,
) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddBlocksFormRedesigned {...props} />}
            off={<AddBlocksFormDeprecated {...props} />}
        />
    );
};
