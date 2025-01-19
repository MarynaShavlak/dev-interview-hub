import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/common/Modal';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ConfirmDeleteModal.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';

interface ConfirmDeleteModalProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
    text: string;
}

export const ConfirmDeleteModal = memo((props: ConfirmDeleteModalProps) => {
    const { className, isOpen, onCancel, text, onConfirm } = props;
    const { t } = useTranslation();
    const confirmText = `${t('Текст підтвердження')} ${text}?`;
    const warningText = t('Текст попередження');

    return (
        <Modal className={className} isOpen={isOpen} onClose={onCancel} lazy>
            {/* <AuthForm onSuccess={onClose} /> */}
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
                        className={cls.deleteIconWrap}
                    >
                        <Icon
                            Svg={DeleteIcon}
                            width={24}
                            className={cls.deleteIcon}
                            variant="error"
                        />
                    </HStack>

                    <Text text={t('Підтвердити видалення')} bold size="m" />

                    <Text text={confirmText} />
                    <Text text={warningText} />
                </VStack>
                <HStack justify="between" max>
                    <Button onClick={onCancel}>{t('Відмінити')}</Button>
                    <Button variant="cancel" onClick={onConfirm}>
                        {t('Видалити')}
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
});
