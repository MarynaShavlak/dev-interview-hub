import { memo, useCallback } from 'react';
import { EditableProfileCardHeaderRedesigned } from './EditableProfileCardHeaderRedesigned/EditableProfileCardHeaderRedesigned';
import { EditableProfileCardHeaderDeprecated } from './EditableProfileCardHeaderDeprecated/EditableProfileCardHeaderDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useGetUserRoles, useUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProfileActions } from '../../model/slices/profileSlice';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateUserProfileThunk } from '../../model/services/updateUserProfileThunk/updateUserProfileThunk';
import { useProfile } from '../../lib/hooks/useProfile/useProfile';
import { useUploadedProfilePhoto } from '../../model/selectors/getUploadedProfilePhoto/getUploadedProfilePhoto';
import { uploadUserProfileImageThunk } from '../../model/services/uploadUserProfileImageThunk/uploadUserProfileImageThunk';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const authData = useUserAuthData();
        const profileData = useProfileData();

        const { isAdmin } = useGetUserRoles();
        const canEdit = authData?.id === profileData?.id || isAdmin;

        const readonly = useProfileReadonly();
        const dispatch = useAppDispatch();
        const { hasInputErrors, onChangeAvatar } = useProfile();
        const { setReadonly, cancelEdit } = useProfileActions();
        const uploadedProfilePhoto = useUploadedProfilePhoto();

        const onSave = useCallback(async () => {
            if (uploadedProfilePhoto) {
                const url = await dispatch(
                    uploadUserProfileImageThunk(uploadedProfilePhoto),
                ).unwrap();
                onChangeAvatar(url);
            }
            if (uploadedProfilePhoto == null && !profileData?.avatar) {
                onChangeAvatar('');
            }

            dispatch(updateUserProfileThunk());
        }, [dispatch, onChangeAvatar, profileData, uploadedProfilePhoto]);

        const onEdit = useCallback(() => {
            setReadonly(false);
        }, [setReadonly]);

        const onCancelEdit = useCallback(() => {
            cancelEdit();
        }, [cancelEdit]);

        const commonProps = {
            onEdit,
            onCancelEdit,
            onSave,
            canEdit,
            readonly,
            hasInputErrors,
            className,
        };

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<EditableProfileCardHeaderRedesigned {...commonProps} />}
                off={<EditableProfileCardHeaderDeprecated {...commonProps} />}
            />
        );
    },
);
