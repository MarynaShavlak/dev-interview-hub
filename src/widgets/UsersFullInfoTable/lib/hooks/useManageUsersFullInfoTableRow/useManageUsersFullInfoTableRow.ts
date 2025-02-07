import { useCallback, useEffect, useState } from 'react';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { UserRole, useUserProfileNavigation } from '@/entities/User';
import { useUsersTableData } from '../useUsersTableData';

import { updateUserRoleThunk } from '../../../model/services/updateUserRoleThunk/updateUserRoleThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface SelectedUser {
    id: string;
    username: string;
}

interface UseManageUsersFullInfoTableRowReturnType {
    // handleDeleteClick: (userId: string) => void;
    handleEditClick: (userId: string) => void;
    // confirmDelete: () => Promise<void>;
    selectedUser: SelectedUser | null;
    isLoading: boolean;
    data: UsersTableInfo[];
    updateTableRow: (rowIndex: number, columnId: string, value: any) => void;
    // deleteUserModal: UseToggleVisibilityReturnType;
}

export const useManageUsersFullInfoTableRow =
    (): UseManageUsersFullInfoTableRowReturnType => {
        const { users, isLoading } = useUsersTableData();
        const [data, setData] = useState<UsersTableInfo[]>([]);
        const dispatch = useAppDispatch();

        useEffect(() => {
            if (
                !isLoading &&
                users.length !== data.length &&
                users.length !== 0
            ) {
                setData(users);
            }
        }, [users, isLoading, data.length, setData]);

        const { navigateToUserProfile } = useUserProfileNavigation();
        // const deleteUserModal = useToggleVisibility();
        const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(
            null,
        );

        const updateTableRow = useCallback(
            async (rowIndex: number, columnId: string, value: UserRole) => {
                if (!value) {
                    console.error('New value is required to update user data.');
                    return null;
                }

                try {
                    const user = await dispatch(updateUserRoleThunk([value]));
                    console.log('user', user);
                    // const deletedArticleId = await onDeleteArticle(articleId);
                    setData((prevData) => {
                        console.log('prevData', prevData);
                        return prevData.map((row, index) => {
                            if (index === rowIndex) {
                                console.log('rowIndex', rowIndex);
                                console.log('columnId', columnId);
                                console.log('value', value);
                            }

                            return index === rowIndex
                                ? { ...row, [columnId]: value }
                                : row;
                        });
                    });
                } catch (error: any) {
                    console.error('Error deleting article:', error);
                }
                // console.log('update data');

                console.log('data after update: ', data);
            },
            [data, dispatch],
        );

        // const deleteTableRow = useCallback(
        //     async (userId: string) => {
        //         if (!userId) {
        //             console.error('User ID is required to delete the user.');
        //             return null;
        //         }
        //
        //         try {
        //             const deletedUserId = await onDeleteUser(userId);
        //             setData((prevData) =>
        //                 prevData.filter((row) => row.id !== userId),
        //             );
        //
        //             return deletedUserId;
        //             // return userId;
        //         } catch (error: any) {
        //             console.error('Error deleting user:', error);
        //
        //             return null;
        //         }
        //     },
        //     [onDeleteUser],
        // );
        //
        // const confirmDelete = useCallback(async () => {
        //     if (selectedUser) {
        //         await deleteTableRow(selectedUser.id);
        //         deleteUserModal.hide();
        //         setSelectedUser(null);
        //     }
        // }, [selectedUser, deleteTableRow, deleteUserModal]);
        //
        // const handleDeleteClick = useCallback(
        //     (userId: string) => {
        //         const user = data.find((item) => item.id === userId);
        //         if (user) {
        //             setSelectedUser({
        //                 id: userId,
        //                 username: user?.username || '',
        //             });
        //         }
        //
        //         deleteUserModal.show();
        //     },
        //     [data, deleteUserModal],
        // );

        const handleEditClick = useCallback(
            (userId: string) => {
                if (userId) {
                    navigateToUserProfile(userId);
                }
            },
            [navigateToUserProfile],
        );

        return {
            // handleDeleteClick,
            handleEditClick,
            // confirmDelete,
            selectedUser,
            isLoading,
            data,
            updateTableRow,
            // deleteUserModal,
        };
    };
