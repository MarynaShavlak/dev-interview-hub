import { useTranslation } from 'react-i18next';

import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import cls from '../EditableProfileCardHeader.module.scss';

interface RedesignedEditableProfileCardHeaderProps {
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: () => void;
    canEdit: boolean;
    readonly?: boolean;
    className?: string;

    hasInputErrors?: boolean;
}

export const RedesignedEditableProfileCardHeader = memo(
    (props: RedesignedEditableProfileCardHeaderProps) => {
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
                className={classNames('', {}, [className, cls.header])}
            >
                {canEdit && (
                    <HStack className={cls.wrap} justify="end" max>
                        {readonly ? (
                            <Button
                                variant="outline"
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редагувати профіль')}
                            </Button>
                        ) : (
                            <HStack gap="8" justify="between" max>
                                <Button
                                    variant="cancel"
                                    onClick={onCancelEdit}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Відмінити')}
                                </Button>
                                <Button
                                    variant="save"
                                    onClick={onSave}
                                    disabled={hasInputErrors}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Зберегти')}
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                )}
            </HStack>
        );
    },
);
