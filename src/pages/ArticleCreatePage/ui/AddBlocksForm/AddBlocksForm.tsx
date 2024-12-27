import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { useArticleBlocks } from '../../lib/hooks/useArticleBlocks/useArticleBlocks';
import { Each } from '@/shared/lib/components/Each/Each';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';
import { Box } from '@/shared/ui/common/Box';

interface AddBlocksFormProps {
    index: number;
}
export const AddBlocksForm = memo((props: AddBlocksFormProps) => {
    const { index } = props;
    const { t } = useTranslation('articleDetails');
    const {
        blocks: allBlocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
    } = useArticleBlocks();

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16">
                <Text text={t('Блоки статті')} bold />
                <HStack gap="16" align="end" max>
                    <Box>
                        <Each
                            of={allBlocks}
                            render={(block) => (
                                <BlockRenderer
                                    key={block.id}
                                    block={block}
                                    addBlockInArticle={addBlock}
                                    deleteBlockFromArticle={deleteBlock}
                                    onEditBlock={updateBlock}
                                />
                            )}
                        />
                    </Box>

                    <AddArticleBlocksButtons
                        onAddTextBlockBtnClick={createEmptyTextBlock}
                        onAddCodeBlockBtnClick={createEmptyCodeBlock}
                        onAddImageBlockBtnClick={createEmptyImageBlock}
                    />
                </HStack>
            </VStack>
        </HStack>
    );
});
