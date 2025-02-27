import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

interface EditableProfileCardHeaderDeprecatedProps {
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: () => void;
    canEdit: boolean;
    readonly?: boolean;
    className?: string;
    hasInputErrors: boolean;
}

export const EditableProfileCardHeaderDeprecated = memo(
    (props: EditableProfileCardHeaderDeprecatedProps) => {
        const {
            className,
            onEdit,
            onCancelEdit,
            onSave,
            readonly,
            canEdit,
            hasInputErrors,
        } = props;
        const { t } = useTranslation('profile');

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                <Text title={t('Профіль')} />
                {canEdit && (
                    <div>
                        {readonly ? (
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редагувати')}
                            </Button>
                        ) : (
                            <HStack gap="8">
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Відмінити')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                    disabled={hasInputErrors}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Зберегти')}
                                </Button>
                            </HStack>
                        )}
                    </div>
                )}
            </HStack>
        );
    },
);
