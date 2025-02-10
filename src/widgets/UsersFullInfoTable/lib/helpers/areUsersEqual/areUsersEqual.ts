import { UsersTableInfo } from '../../../model/types/usersTableInfo';

export const areUsersEqual = (
    prevUsers: UsersTableInfo[],
    newUsers: UsersTableInfo[],
): boolean => {
    if (prevUsers.length !== newUsers.length) return false;

    return prevUsers.every((prevUser, index) => {
        const newUser = newUsers[index];
        return (
            prevUser.id === newUser.id &&
            prevUser.username === newUser.username &&
            JSON.stringify(prevUser.role) === JSON.stringify(newUser.role)
        );
    });
};
