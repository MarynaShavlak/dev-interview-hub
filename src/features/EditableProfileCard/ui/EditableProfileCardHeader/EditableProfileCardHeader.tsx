import { memo, useCallback } from 'react';
import { RedesignedEditableProfileCardHeader } from './RedesignedEditableProfileCardHeader/RedesignedEditableProfileCardHeader';
import { DeprecatedEditableProfileCardHeader } from './DeprecatedEditableProfileCardHeader/DeprecatedEditableProfileCardHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProfileActions } from '../../model/slices/profileSlice';
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
        console.log('inProfile authdata', authData);

        const profileData = useProfileData();
        console.log('inProfile profiledata', profileData);
        const canEdit = authData?.id === profileData?.id;
        const readonly = useProfileReadonly();
        const dispatch = useAppDispatch();
        const { setReadonly, cancelEdit } = useProfileActions();

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

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
            className,
        };

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedEditableProfileCardHeader {...commonProps} />}
                off={<DeprecatedEditableProfileCardHeader {...commonProps} />}
            />
        );
    },
);
