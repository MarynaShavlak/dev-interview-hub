import { useCallback, useEffect, useState } from 'react';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { UserRole, useUserProfileNavigation } from '@/entities/User';
import { useUsersTableData } from '../useUsersTableData';

import { updateUserRoleThunk } from '../../../model/services/updateUserRoleThunk/updateUserRoleThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { areUsersEqual } from '../../helpers/areUsersEqual/areUsersEqual';

interface SelectedUser {
    id: string;
    username: string;
}

interface UseManageUsersFullInfoTableRowReturnType {
    handleEditRow: (userId: string) => void;
    selectedUser: SelectedUser | null;
    isLoading: boolean;
    data: UsersTableInfo[] | null;
    handleUpdateRow: (rowId: string, columnId: string, value: UserRole) => void;
}

export const useManageUsersFullInfoTableRow =
    (): UseManageUsersFullInfoTableRowReturnType => {
        const { users, isLoading } = useUsersTableData();

        const [data, setData] = useState<UsersTableInfo[] | null>(null);
        const dispatch = useAppDispatch();

        useEffect(() => {
            if (
                !isLoading &&
                users.length > 0 &&
                !areUsersEqual(data || [], users)
            ) {
                setData(users);
            }
        }, [users, isLoading, data]);

        const { navigateToUserProfile } = useUserProfileNavigation();

        const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(
            null,
        );

        const handleUpdateRow = useCallback(
            async (rowId: string, columnId: string, value: UserRole) => {
                if (!value) {
                    console.error('New value is required to update user data.');
                    return null;
                }

                try {
                    console.log('value', value);
                    const updatedUser = await dispatch(
                        updateUserRoleThunk({
                            userId: rowId,
                            newRoles: [value],
                        }),
                    );
                    console.log('updatedUser', updatedUser);
                    return updatedUser;
                } catch (error: any) {
                    console.error('Error updating user data:', error);
                    return null;
                }
            },
            [dispatch],
        );

        const handleEditRow = useCallback(
            (userId: string) => {
                if (userId) {
                    navigateToUserProfile(userId);
                }
            },
            [navigateToUserProfile],
        );

        return {
            handleEditRow,
            selectedUser,
            isLoading,
            data,
            handleUpdateRow,
        };
    };
