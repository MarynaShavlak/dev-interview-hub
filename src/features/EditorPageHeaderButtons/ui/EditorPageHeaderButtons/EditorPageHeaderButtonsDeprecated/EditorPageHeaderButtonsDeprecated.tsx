import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { EditorPageHeaderButtonsProps } from '../EditorPageHeaderButtons';

export const EditorPageHeaderButtonsDeprecated = memo(
    (props: EditorPageHeaderButtonsProps) => {
        const { t } = useTranslation();
        const {
            isEditPage,
            canSave,
            onClear,
            onCancelEdit,
            onUpdate,
            onSave,
            onDelete,
            className,
        } = props;

        return (
            <HStack gap="8" className={className}>
                {isEditPage && (
                    <>
                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onDelete}
                        >
                            {t('Видалити')}
                        </Button>
                        <Button onClick={onCancelEdit}>{t('Відмінити')}</Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND_INVERTED}
                            onClick={onUpdate}
                            disabled={!canSave}
                        >
                            {t('Зберегти зміни')}
                        </Button>
                    </>
                )}
                {!isEditPage && (
                    <>
                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onClear}
                        >
                            {t('Очистити')}
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND_INVERTED}
                            onClick={onSave}
                            disabled={!canSave}
                        >
                            {t('Зберегти')}
                        </Button>
                    </>
                )}
            </HStack>
        );
    },
);
