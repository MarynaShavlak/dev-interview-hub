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
import { AddHRInterviewQABlocksButtons } from '../../AddHRInterviewQABlocksButtons/AddHRInterviewQABlocksButtons';
import { useHRInterviewQABlocksActions } from '../../../lib/hooks/useHRInterviewQABlocksActions/useHRInterviewQABlocksActions';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';
import { getBtnsListDeprecatedStyles } from '../../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { getPageElement } from '@/shared/lib/getDOMElements/getDOMElement';
import { useAriaExpandedZIndex } from '../../../lib/hooks/useAriaExpandedZIndex/useAriaExpandedZIndex';
import { calculateZIndex } from '../../../lib/utils/calculateZIndex/calculateZIndex';
import { TextBlockEditor } from '@/widgets/TextBlockEditor';

export const AddBlocksFormDeprecated = memo((props: AddBlocksFormProps) => {
    const { index, blocks: allBlocks, blockActions } = props;

    const { insertTextBlock, clearBlocks } = blockActions;
    const { t } = useTranslation('articleDetails');
    const isSomeBlockAdded = Number(allBlocks.length) > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLElement | null>(getPageElement());
    const topPosition = useTriggerTopScrollPosition(
        triggerRef,
        scrollContainer,
    );
    const zIndexNotifications = useAriaExpandedZIndex('trigger');
    const zIndexAvatarDropdown = useAriaExpandedZIndex('dropdown-trigger');

    const zIndex = calculateZIndex(zIndexNotifications, zIndexAvatarDropdown);
    const {
        handleAddHRInterviewQABlock,
        handleUpdateHRInterviewQABlock,
        handleDeleteHRInterviewQABlock,
    } = useHRInterviewQABlocksActions(blockActions);

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
