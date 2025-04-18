import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { Icon } from '../../../../deprecated/Icon';
import { Text, TextAlign, TextSize } from '../../../../deprecated/Text';
import { HStack, VStack } from '../../../Stack';
import cls from './ConfirmDeleteContentDeprecated.module.scss';
import { Button, ButtonTheme } from '../../../../deprecated/Button';
import { ConfirmDeleteContentProps } from '../ConfirmDeleteContent';

export const ConfirmDeleteContentDeprecated = memo(
    (props: ConfirmDeleteContentProps) => {
        const { onCancel, text, onConfirm } = props;
        const { t } = useTranslation();
        const confirmText = `${t('Текст підтвердження')} ${text}?`;
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
                        className={cls.deleteIconWrap}
                    >
                        <Icon
                            Svg={DeleteIcon}
                            width={24}
                            className={cls.deleteIcon}
                            // variant="error"
                        />
                    </HStack>

                    <Text text={t('Підтвердити видалення')} size={TextSize.M} />

                    <Text text={confirmText} align={TextAlign.JUSTIFY} />
                    <Text text={warningText} />
                </VStack>
                <HStack justify="between" max>
                    <Button onClick={onCancel}>{t('Відмінити')}</Button>
                    <Button theme={ButtonTheme.OUTLINE_RED} onClick={onConfirm}>
                        {t('Видалити')}
                    </Button>
                </HStack>
            </VStack>
        );
    },
);
