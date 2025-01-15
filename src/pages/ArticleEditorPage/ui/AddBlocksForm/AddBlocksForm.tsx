import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { Each } from '@/shared/lib/components/Each/Each';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';
import cls from './AddBlocksForm.module.scss';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';
import { getBtnsListStyles } from '../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { ArticleBlock } from '@/entities/Article';
import { useArticleFormState } from '../../lib/hooks/useArticleFormState/useArticleFormState';

interface AddBlocksFormProps {
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
export const AddBlocksForm = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const {
        insertTextBlock,
        insertCodeBlock,
        insertImageBlock,
        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    } = blockActions;
    const { t } = useTranslation('articleDetails');
    const isSomeBlockAdded = Number(allBlocks.length) > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const topPosition = useTriggerTopScrollPosition(triggerRef);

    const { formData, onDeleteBlock, onChangeBlocks } = useArticleFormState();

    // ______________________________________________
    const handleDeleteArticleBlock = useCallback(
        (blockId: string) => {
            console.log('___in common function', blockId);
            removeBlock(blockId);
            onDeleteBlock(blockId);
        },
        [removeBlock, onDeleteBlock],
    );

    const handleUpdateArticleBlock = useCallback(
        (updatedBlock: ArticleBlock) => {
            updateBlock(updatedBlock);
            onChangeBlocks(updatedBlock);
        },
        [onChangeBlocks, updateBlock],
    );

    const handleAddArticleBlock = useCallback(
        (newBlock: ArticleBlock) => {
            addBlock(newBlock);
            onChangeBlocks(newBlock);
        },
        [addBlock, onChangeBlocks],
    );
    // ___________________________________________

    useEffect(() => {
        if (elementRef.current) {
            const styles = getBtnsListStyles(topPosition);
            Object.assign(elementRef.current.style, styles);
        }
    }, [topPosition]);

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm} max>
                <Text text={t('Блоки статті')} bold />
                <Text
                    text={t('Додайте блок')}
                    className={cls.subtext}
                    italic
                    variant={isSomeBlockAdded ? 'primary' : 'error'}
                />
                <div ref={triggerRef} />
                <div ref={elementRef} className={cls.btnList}>
                    <AddArticleBlocksButtons
                        direction="row"
                        onAddTextBlockBtnClick={insertTextBlock}
                        onAddCodeBlockBtnClick={insertCodeBlock}
                        onAddImageBlockBtnClick={insertImageBlock}
                        deleteAllBlocks={clearBlocks}
                        isSomeBlockAdded={isSomeBlockAdded}
                    />
                </div>

                <VStack gap="16" max>
                    <Each
                        of={allBlocks}
                        render={(block) => (
                            <BlockRenderer
                                key={block.id}
                                block={block}
                                // addBlockInArticle={addBlock}
                                addBlockInArticle={handleAddArticleBlock}
                                // deleteBlockFromArticle={deleteBlock}
                                deleteBlockFromArticle={
                                    handleDeleteArticleBlock
                                }
                                // onEditBlock={updateBlock}
                                onEditBlock={handleUpdateArticleBlock}
                            />
                        )}
                    />
                </VStack>
            </VStack>
        </HStack>
    );
});
