import { memo, useCallback } from 'react';
import { RedesignedEditableProfileCardHeader } from './RedesignedEditableProfileCardHeader/RedesignedEditableProfileCardHeader';
import { DeprecatedEditableProfileCardHeader } from './DeprecatedEditableProfileCardHeader/DeprecatedEditableProfileCardHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
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

        const authData = useUserAuthData();
        const profileData = useProfileData();
        const canEdit = authData?.id === profileData?.id;
        const readonly = useProfileReadonly();
        const dispatch = useAppDispatch();

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
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <RedesignedEditableProfileCardHeader
                        onEdit={onEdit}
                        onCancelEdit={onCancelEdit}
                        onSave={onSave}
                        canEdit={canEdit}
                        readonly={readonly}
                    />
                }
                off={
                    <DeprecatedEditableProfileCardHeader
                        onEdit={onEdit}
                        onCancelEdit={onCancelEdit}
                        onSave={onSave}
                        canEdit={canEdit}
                        readonly={readonly}
                    />
                }
            />
        );
    },
);
