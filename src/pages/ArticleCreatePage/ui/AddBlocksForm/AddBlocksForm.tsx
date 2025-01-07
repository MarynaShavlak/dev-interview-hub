import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useRef } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { useArticleBlocks } from '../../lib/hooks/useArticleBlocks/useArticleBlocks';
import { Each } from '@/shared/lib/components/Each/Each';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';
import cls from './AddBlocksForm.module.scss';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';
import { getBtnsListStyles } from '../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';

interface AddBlocksFormProps {
    index: number;
}
export const AddBlocksForm = memo((props: AddBlocksFormProps) => {
    const { index } = props;
    const { t } = useTranslation('articleDetails');
    const { formData } = useCreateArticle();
    const isSomeBlockAdded = Number(formData?.blocks.length) > 0;
    const {
        blocks: allBlocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
    } = useArticleBlocks();
    console.log('allBlocks', allBlocks);

    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const topPosition = useTriggerTopScrollPosition(triggerRef);

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
                        className={cls.example}
                        direction="row"
                        onAddTextBlockBtnClick={createEmptyTextBlock}
                        onAddCodeBlockBtnClick={createEmptyCodeBlock}
                        onAddImageBlockBtnClick={createEmptyImageBlock}
                    />
                </div>

                <VStack gap="16" max>
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
                </VStack>
            </VStack>
        </HStack>
    );
});
