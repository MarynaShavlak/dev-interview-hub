import React, { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';
import { useHRInterviewQABlocksActions } from '../../lib/hooks/useHRInterviewQABlocksActions/useHRInterviewQABlocksActions';
import { OrderCard as OrderCardRedesigned } from '@/shared/ui/redesigned/OrderCard';
import { OrderCard as OrderCardDeprecated } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './Blocks.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';
import { AddBlocksForm } from '@/widgets/AddBlocksForm';

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
export const Blocks = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const {
        handleAddHRInterviewQABlock,
        handleUpdateHRInterviewQABlock,
        handleDeleteHRInterviewQABlock,
    } = useHRInterviewQABlocksActions(blockActions);
    const OrderCard = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => OrderCardRedesigned,
        off: () => OrderCardDeprecated,
    });

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm} max>
                <AddBlocksForm<HRInterviewQABlock>
                    isSomeBlockAdded={!!allBlocks.length}
                    entityType="hrInterviewQA"
                    blockActions={{
                        ...props.blockActions,
                    }}
                />

                <VStack gap="16" max>
                    <Each
                        of={allBlocks}
                        render={(block) => (
                            <TextBlockEditor
                                key={block.id}
                                block={block}
                                addBlockInArticle={handleAddHRInterviewQABlock}
                                deleteBlockFromArticle={
                                    handleDeleteHRInterviewQABlock
                                }
                                onEditBlock={handleUpdateHRInterviewQABlock}
                            />
                        )}
                    />
                </VStack>
            </VStack>
        </HStack>
    );
});
