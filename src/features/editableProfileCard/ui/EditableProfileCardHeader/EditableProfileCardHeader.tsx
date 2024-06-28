import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { profileActions } from '../../model/slice/profileSlice';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('profile');
        const authData = useUserAuthData();
        const profileData = useProfileData();
        const canEdit = authData?.id === profileData?.id;
        const readonly = useProfileReadonly();
        const dispatch = useAppDispatch();
        // const { cancelEdit, setReadonly } = useProfileActions();

        // const onEdit = useCallback(() => {
        //     setReadonly(false);
        // }, [setReadonly]);
        //
        // const onCancelEdit = useCallback(() => {
        //     cancelEdit();
        // }, [cancelEdit]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

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
