import { useGetUserStats } from './useGetUserStats/useGetUserStats';
import { getEnabledUserFeatures } from '../helpers/getData/processUserFeatures/processUserFeatures';
import { getRoleData } from '../helpers/getData/getRolesData/getRoleData';
import { UsersTableInfo } from '../../model/types/usersTableInfo';

export const useUsersTableData = () => {
    const { isLoading, users, isError, stats } = useGetUserStats();
    if (!users || !stats) return { users: [], isLoading, isError };

    const combinedUsersData: UsersTableInfo[] = users.map(
        ({
            id,
            roles,
            features,
            username,
            email,
            avatar,
            lastname,
            firstname,
        }) => {
            return {
                id: id || '',
                username: username || '',
                email: email || '',
                avatar: avatar || '',
                lastname,
                firstname,
                role: getRoleData(roles),
                features: getEnabledUserFeatures(features),
                ...stats[id],
            };
        },
    );

    if (!combinedUsersData) return { users: [], isLoading, isError };

    return { users: combinedUsersData, isLoading, isError };
};
