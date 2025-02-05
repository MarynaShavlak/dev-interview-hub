import { useGetUserStats } from './useGetUserStats/useGetUserStats';
import { getEnabledUserFeatures } from '../helpers/getData/processUserFeatures/processUserFeatures';
import { getRoleData } from '../helpers/getData/getRolesData/getRoleData';

export const useUsersTableData = () => {
    const { isLoading, users, isError, stats } = useGetUserStats();
    if (!users || !stats) return { users: [], isLoading, isError };

    const combinedUsersData = users.map(
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

    // if (!combinedUsersData) return { users: [], isLoading, isError };

    return { users: combinedUsersData, isLoading, isError };
};
