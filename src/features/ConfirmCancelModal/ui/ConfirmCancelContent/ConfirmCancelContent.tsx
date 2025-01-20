import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import AttentionIcon from '@/shared/assets/icons/attention.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ConfirmCancelContent.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';

export interface ConfirmCancelContentProps {
    onCancel: () => void;
    onConfirm: () => void;
    text: string;
    cancelBtnText: string;
    confirmBtnText: string;
}

const ConfirmCancelContent = memo((props: ConfirmCancelContentProps) => {
    const { onCancel, onConfirm, text, cancelBtnText, confirmBtnText } = props;
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
                        variant="error"
                    />
                </HStack>

                <Text text={t('Незбережені зміни')} bold size="m" />

                <Text text={confirmText} />
                <Text text={warningText} />
            </VStack>
            <HStack justify="between" max>
                <Button onClick={onCancel}>{cancelBtnText}</Button>
                <Button variant="cancel" onClick={onConfirm}>
                    {confirmBtnText}
                </Button>
            </HStack>
        </VStack>
    );
});

export default ConfirmCancelContent;
