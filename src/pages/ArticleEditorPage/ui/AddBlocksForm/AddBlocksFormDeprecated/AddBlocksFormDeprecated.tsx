import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useRef } from 'react';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { Each } from '@/shared/lib/components/Each/Each';

import cls from '../AddBlocksForm.module.scss';

import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AddBlocksFormProps } from '../AddBlocksForm';
import { AddArticleBlocksButtons } from '../../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer';
import { useArticleBlocksActions } from '../../../lib/hooks/useArticleBlocksActions/useArticleBlocksActions';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';
import { getBtnsListDeprecatedStyles } from '../../../lib/utils/getBtnsListStyles/getBtnsListStyles';

export const AddBlocksFormDeprecated = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const { insertTextBlock, insertCodeBlock, insertImageBlock, clearBlocks } =
        blockActions;
    const { t } = useTranslation('articleDetails');
    const isSomeBlockAdded = Number(allBlocks.length) > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLElement | null>(
        document.querySelector('[data-testid="Page"]'),
    );
    const topPosition = useTriggerTopScrollPosition(
        triggerRef,
        scrollContainer,
    );

    const {
        handleAddArticleBlock,
        handleUpdateArticleBlock,
        handleDeleteArticleBlock,
    } = useArticleBlocksActions(blockActions);

    useEffect(() => {
        if (elementRef.current && topPosition !== 0) {
            const styles = getBtnsListDeprecatedStyles(topPosition);
            Object.assign(elementRef.current.style, styles);
        }
    }, [topPosition]);

    const btnListFlexClasses = getFlexClasses({ hStack: true, gap: '16' });

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm} max>
                <Text title={t('Блоки статті')} />
                <Text
                    text={t('Додайте блок')}
                    className={cls.subtext}
                    theme={
                        isSomeBlockAdded ? TextTheme.PRIMARY : TextTheme.ERROR
                    }
                />
                <div ref={triggerRef} />
                <div
                    ref={elementRef}
                    className={classNames(
                        cls.btnListDeprecated,
                        {},
                        btnListFlexClasses,
                    )}
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
