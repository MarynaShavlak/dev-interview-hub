import { useCallback, useEffect, useState } from 'react';
import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { useUserProfileNavigation } from '@/entities/User';
import { useUsersTableData } from '../useUsersTableData';

interface SelectedUser {
    id: string;
    username: string;
}

interface UseManageUsersFullInfoTableRowReturnType {
    handleDeleteClick: (userId: string) => void;
    handleEditClick: (userId: string) => void;
    confirmDelete: () => Promise<void>;
    selectedUser: SelectedUser | null;
    isLoading: boolean;
    data: UsersTableInfo[];
    deleteUserModal: UseToggleVisibilityReturnType;
}

export const useManageUsersFullInfoTableRow = (
    onDeleteUser: (userId: string) => Promise<string | null>,
): UseManageUsersFullInfoTableRowReturnType => {
    const { users, isLoading } = useUsersTableData();
    const [data, setData] = useState<UsersTableInfo[]>([]);

    useEffect(() => {
        if (!isLoading && users.length !== data.length && users.length !== 0) {
            setData(users);
        }
    }, [users, isLoading, data.length, setData]);

    const { navigateToUserProfile } = useUserProfileNavigation();
    const deleteUserModal = useToggleVisibility();
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

    const deleteTableRow = useCallback(
        async (userId: string) => {
            if (!userId) {
                console.error('User ID is required to delete the user.');
                return null;
            }

            try {
                const deletedUserId = await onDeleteUser(userId);
                setData((prevData) =>
                    prevData.filter((row) => row.id !== userId),
                );

                return deletedUserId;
                // return userId;
            } catch (error: any) {
                console.error('Error deleting user:', error);

                return null;
            }
        },
        [onDeleteUser],
    );

    const confirmDelete = useCallback(async () => {
        if (selectedUser) {
            await deleteTableRow(selectedUser.id);
            deleteUserModal.hide();
            setSelectedUser(null);
        }
    }, [selectedUser, deleteTableRow, deleteUserModal]);

    const handleDeleteClick = useCallback(
        (userId: string) => {
            const user = data.find((item) => item.id === userId);
            if (user) {
                setSelectedUser({
                    id: userId,
                    username: user?.username || '',
                });
            }

            deleteUserModal.show();
        },
        [data, deleteUserModal],
    );

    const handleEditClick = useCallback(
        (userId: string) => {
            if (userId) {
                navigateToUserProfile(userId);
            }
        },
        [navigateToUserProfile],
    );

    return {
        handleDeleteClick,
        handleEditClick,
        confirmDelete,
        selectedUser,
        isLoading,
        data,
        deleteUserModal,
    };
};
