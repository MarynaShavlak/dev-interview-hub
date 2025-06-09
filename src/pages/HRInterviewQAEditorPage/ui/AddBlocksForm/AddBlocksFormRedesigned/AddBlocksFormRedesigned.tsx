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
import { AddHRInterviewQABlocksButtons } from '../../AddHRInterviewQABlocksButtons/AddHRInterviewQABlocksButtons';
import { useHRInterviewQABlocksActions } from '../../../lib/hooks/useHRInterviewQABlocksActions/useHRInterviewQABlocksActions';
import { useAriaExpandedZIndex } from '../../../lib/hooks/useAriaExpandedZIndex/useAriaExpandedZIndex';
import { calculateZIndex } from '../../../lib/utils/calculateZIndex/calculateZIndex';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';

export const AddBlocksFormRedesigned = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const { insertTextBlock, clearBlocks } = blockActions;
    const { t } = useTranslation('articleDetails');
    const isSomeBlockAdded = Number(allBlocks.length) > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const topPosition = useTriggerTopScrollPosition(triggerRef);

    const {
        handleAddHRInterviewQABlock,
        handleUpdateHRInterviewQABlock,
        handleDeleteHRInterviewQABlock,
    } = useHRInterviewQABlocksActions(blockActions);

    useEffect(() => {
        if (elementRef.current && topPosition !== 0) {
            const styles = getBtnsListStyles(topPosition);
            Object.assign(elementRef.current.style, styles);
        }
    }, [topPosition]);

    const btnListFlexClasses = getFlexClasses({ hStack: true, gap: '16' });
    const zIndexNotifications = useAriaExpandedZIndex('trigger');
    const zIndexAvatarDropdown = useAriaExpandedZIndex('dropdown-trigger');

    const zIndex = calculateZIndex(zIndexNotifications, zIndexAvatarDropdown);
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
                    className={classNames(
                        cls.btnListRedesigned,
                        {},
                        btnListFlexClasses,
                    )}
                    style={{ zIndex }}
                >
                    <AddHRInterviewQABlocksButtons
                        onAddTextBlockBtnClick={insertTextBlock}
                        deleteAllBlocks={clearBlocks}
                        isSomeBlockAdded={isSomeBlockAdded}
                    />
                </div>

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
