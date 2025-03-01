import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import AttentionIcon from '@/shared/assets/icons/attention.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ConfirmCancelContentDeprecated.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ConfirmCancelContentProps } from '../ConfirmCancelContent';

export const ConfirmCancelContentDeprecated = memo(
    (props: ConfirmCancelContentProps) => {
        const { onCancel, onConfirm, text, cancelBtnText, confirmBtnText } =
            props;
        const { t } = useTranslation();
        const confirmText = `${t('Текст відміни')} ${text}?`;
        const warningText = t('Текст попередження');

        return (
            <VStack gap="24">
                <VStack
                    gap="16"
                    justify="center"
                    align="center"
                    className={cls.confirmContent}
                >
                    <HStack
                        justify="center"
                        align="center"
                        className={cls.cancelIconWrap}
                    >
                        <Icon
                            Svg={AttentionIcon}
                            width={24}
                            className={cls.cancelIcon}
                        />
                    </HStack>

                    <Text text={t('Незбережені зміни')} size={TextSize.M} />

                    <Text text={confirmText} />
                    <Text text={warningText} />
                </VStack>
                <HStack justify="between" max>
                    <Button onClick={onCancel}>{cancelBtnText}</Button>
                    <Button theme={ButtonTheme.OUTLINE_RED} onClick={onConfirm}>
                        {confirmBtnText}
                    </Button>
                </HStack>
            </VStack>
        );
    },
);
