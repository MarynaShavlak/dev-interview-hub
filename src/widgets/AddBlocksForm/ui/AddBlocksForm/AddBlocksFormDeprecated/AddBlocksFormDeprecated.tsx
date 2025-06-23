import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/common/Stack';

import cls from '../AddBlocksForm.module.scss';

import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AddBlocksFormProps } from '../AddBlocksForm';

import { useTriggerTopScrollPosition } from '@/shared/lib/hooks/useTriggerTopScrollPosition/useTriggerTopScrollPosition';
import { getPageElement } from '@/shared/lib/getDOMElements/getDOMElement';
import { useAriaExpandedZIndex } from '@/shared/lib/hooks/useAriaExpandedZIndex/useAriaExpandedZIndex';
import { calculateZIndex } from '../../../lib/utils/calculateZIndex/calculateZIndex';
import { getBtnsListDeprecatedStyles } from '../../../lib/utils/getBtnsListStyles/getBtnsListStyles';
import { useFormConfig } from '../../../lib/hooks/useFormConfig/useFormConfig';
import { AddBlocksButtons } from '../../AddBlocksButtons/AddBlocksButtons';
import { getBlockFormConfigOptions } from '../../../lib/utils/getBlockFormConfigOptions/getBlockFormConfigOptions';

export const AddBlocksFormDeprecated = <T extends { id: string }>(
    props: AddBlocksFormProps<T>,
) => {
    const { blockActions, entityType, isSomeBlockAdded } = props;

    const { clearBlocks } = blockActions;
    const { t } = useTranslation('articleDetails');
    // const isSomeBlockAdded = Number(allBlocks.length) > 0;
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

    useEffect(() => {
        if (elementRef.current && topPosition !== 0) {
            const styles = getBtnsListDeprecatedStyles(topPosition);
            Object.assign(elementRef.current.style, styles);
        }
    }, [topPosition]);

    const btnListFlexClasses = getFlexClasses({ hStack: true, gap: '16' });
    const formConfigOptions = getBlockFormConfigOptions(props);
    const { title, buttons } = useFormConfig(formConfigOptions);

    return (
        <VStack gap="16" className={cls.addBlocksForm} max>
            <Text title={title} />
            <Text
                text={t('Додайте блок')}
                className={cls.subtext}
                theme={isSomeBlockAdded ? TextTheme.PRIMARY : TextTheme.ERROR}
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
                <AddBlocksButtons
                    buttons={buttons}
                    deleteAllBlocks={clearBlocks}
                    isSomeBlockAdded={isSomeBlockAdded}
                />
            </div>
        </VStack>
    );
};
