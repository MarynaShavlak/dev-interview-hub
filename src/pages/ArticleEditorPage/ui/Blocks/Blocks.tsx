import React, { memo } from 'react';
import { AddBlocksForm } from '@/features/EditorPageComponents';
import { ArticleBlock } from '@/entities/Article';

import { toggleFeatures } from '@/shared/lib/features';
import { useArticleBlocksActions } from '../../lib/hooks/useArticleBlocksActions/useArticleBlocksActions';
import { OrderCard as OrderCardRedesigned } from '@/shared/ui/redesigned/OrderCard';
import { OrderCard as OrderCardDeprecated } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './Blocks.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';

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
export const Blocks = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const {
        handleAddArticleBlock,
        handleUpdateArticleBlock,
        handleDeleteArticleBlock,
    } = useArticleBlocksActions(blockActions);

    const OrderCard = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => OrderCardRedesigned,
        off: () => OrderCardDeprecated,
    });

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm} max>
                <AddBlocksForm<ArticleBlock>
                    isSomeBlockAdded={!!allBlocks.length}
                    entityType="article"
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
                                addBlockInArticle={handleAddArticleBlock}
                                deleteBlockFromArticle={
                                    handleDeleteArticleBlock
                                }
                                onEditBlock={handleUpdateArticleBlock}
                            />
                        )}
                    />
                </VStack>
            </VStack>
        </HStack>
    );
});
