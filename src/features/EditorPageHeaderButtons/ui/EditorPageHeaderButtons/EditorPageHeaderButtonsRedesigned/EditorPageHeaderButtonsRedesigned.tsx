import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { EditorPageHeaderButtonsProps } from '../EditorPageHeaderButtons';

export const EditorPageHeaderButtonsRedesigned = memo(
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
        } = props;

        return (
            <HStack gap="8">
                {isEditPage && (
                    <>
                        <Button variant="cancel" onClick={onDelete}>
                            {t('Видалити')}
                        </Button>
                        <Button onClick={onCancelEdit}>{t('Відмінити')}</Button>
                        <Button
                            variant="save"
                            onClick={onUpdate}
                            disabled={!canSave}
                        >
                            {t('Зберегти зміни')}
                        </Button>
                    </>
                )}
                {!isEditPage && (
                    <>
                        <Button variant="cancel" onClick={onClear}>
                            {t('Очистити')}
                        </Button>
                        <Button
                            variant="save"
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
