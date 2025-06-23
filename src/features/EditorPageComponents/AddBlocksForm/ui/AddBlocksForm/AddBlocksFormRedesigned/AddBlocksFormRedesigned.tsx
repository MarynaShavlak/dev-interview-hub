import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/common/Stack';
import cls from '../AddBlocksForm.module.scss';
import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';

import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AddBlocksFormProps } from '../AddBlocksForm';

import { useAriaExpandedZIndex } from '@/shared/lib/hooks/useAriaExpandedZIndex/useAriaExpandedZIndex';
import { getBtnsListStyles } from '../../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { calculateZIndex } from '../../../lib/utils/calculateZIndex/calculateZIndex';

import { useFormConfig } from '../../../lib/hooks/useFormConfig/useFormConfig';
import { AddBlocksButtons } from '../../AddBlocksButtons/AddBlocksButtons';
import { getBlockFormConfigOptions } from '../../../lib/utils/getBlockFormConfigOptions/getBlockFormConfigOptions';

export const AddBlocksFormRedesigned = <T extends { id: string }>(
    props: AddBlocksFormProps<T>,
) => {
    const { blockActions, isSomeBlockAdded } = props;
    const { clearBlocks } = blockActions;

    const { t } = useTranslation('articleDetails');
    // const isSomeBlockAdded = allBlocks.length > 0;
    const elementRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const topPosition = useTriggerTopScrollPosition(triggerRef);

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
    const formConfigOptions = getBlockFormConfigOptions(props);
    const { title, buttons } = useFormConfig(formConfigOptions);

    return (
        <VStack gap="16" className={cls.addBlocksForm} max>
            <Text text={title} bold />
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
                <AddBlocksButtons
                    buttons={buttons}
                    deleteAllBlocks={clearBlocks}
                    isSomeBlockAdded={isSomeBlockAdded}
                />
            </div>
        </VStack>
    );
};
