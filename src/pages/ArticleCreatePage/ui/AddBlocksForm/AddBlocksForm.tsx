import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { useArticleBlocks } from '../../lib/hooks/useArticleBlocks/useArticleBlocks';
import { Each } from '@/shared/lib/components/Each/Each';
import { BlockRenderer } from './BlockRenderer/BlockRenderer';
import cls from './AddBlocksForm.module.scss';

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

    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [topPosition, setTopPosition] = useState<number>(0);

    const handleScroll = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setTopPosition(rect.top); // Updates the state with the current top position
        }
    };

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Initial calculation of position
        handleScroll();

        // Cleanup: Remove the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (elementRef.current) {
            // elementRef.current.style.position = 'fixed';
            console.log('topPosition', topPosition);
            if (topPosition > 0) {
                console.log('topPosition', topPosition);
                elementRef.current.style.position = 'static';
                elementRef.current.style.marginTop = '-16px';
            } else {
                elementRef.current.style.position = 'fixed';
                elementRef.current.style.top = `${0}px`;
                elementRef.current.style.marginTop = '0';
            }
        }
    }, [topPosition]);

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" className={cls.addBlocksForm}>
                <Text text={t('Блоки статті')} bold />
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

                <VStack gap="16">
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
