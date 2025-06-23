import React, { memo } from 'react';
import { LiveCodeBlock } from '@/entities/LiveCode';

import { toggleFeatures } from '@/shared/lib/features';
import { useLiveCodeBlocksActions } from '../../lib/hooks/useLiveCodeBlocksActions/useLiveCodeBlocksActions';
import { OrderCard as OrderCardRedesigned } from '@/shared/ui/redesigned/OrderCard';
import { OrderCard as OrderCardDeprecated } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './Blocks.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { AddBlocksForm } from '@/widgets/AddBlocksForm';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';

export interface AddBlocksFormProps {
    index: number;
    blocks: LiveCodeBlock[];
    blockActions: {
        insertTextBlock: () => void;
        insertCodeBlock: () => void;
        addBlock: (block: LiveCodeBlock) => void;
        updateBlock: (updatedBlock: LiveCodeBlock) => void;
        removeBlock: (id: string) => void;
        clearBlocks: () => void;
    };
}
export const Blocks = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const {
        handleAddLiveCodeBlock,
        handleUpdateLiveCodeBlock,
        handleDeleteLiveCodeBlock,
    } = useLiveCodeBlocksActions(blockActions);

    const OrderCard = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => OrderCardRedesigned,
        off: () => OrderCardDeprecated,
    });

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm} max>
                <AddBlocksForm<LiveCodeBlock>
                    isSomeBlockAdded={!!allBlocks.length}
                    entityType="liveCode"
                    blockActions={{
                        ...props.blockActions,
                    }}
                />

                <VStack gap="16" max>
                    <Each
                        of={allBlocks}
                        render={(block) => (
                            <BlockRenderer
                                key={block.id}
                                block={block}
                                addBlockInArticle={handleAddLiveCodeBlock}
                                deleteBlockFromArticle={
                                    handleDeleteLiveCodeBlock
                                }
                                onEditBlock={handleUpdateLiveCodeBlock}
                            />
                        )}
                    />
                </VStack>
            </VStack>
        </HStack>
    );
});
