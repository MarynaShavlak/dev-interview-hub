import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useRef } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';

import { Each } from '@/shared/lib/components/Each/Each';

import cls from '../AddBlocksForm.module.scss';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';

import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AddBlocksFormProps } from '../AddBlocksForm';
import { getBtnsListStyles } from '../../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { AddArticleBlocksButtons } from '../../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer';
import { useArticleBlocksActions } from '../../../lib/hooks/useArticleBlocksActions/useArticleBlocksActions';

export const AddBlocksFormRedesigned = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const { insertTextBlock, insertCodeBlock, insertImageBlock, clearBlocks } =
        blockActions;
    const { t } = useTranslation('articleDetails');
    const isSomeBlockAdded = Number(allBlocks.length) > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const topPosition = useTriggerTopScrollPosition(triggerRef);
    console.log('topPosition', topPosition);
    const {
        handleAddArticleBlock,
        handleUpdateArticleBlock,
        handleDeleteArticleBlock,
    } = useArticleBlocksActions(blockActions);

    useEffect(() => {
        if (elementRef.current) {
            const styles = getBtnsListStyles(topPosition);
            Object.assign(elementRef.current.style, styles);
        }
    }, [topPosition]);

    const btnListFlexClasses = getFlexClasses({ hStack: true, gap: '16' });

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
                <div
                    ref={elementRef}
                    className={classNames(cls.btnList, {}, btnListFlexClasses)}
                >
                    <AddArticleBlocksButtons
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
