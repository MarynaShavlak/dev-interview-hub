import { UserRole } from '@/entities/User';

export const getRolesData = (roles: UserRole[] | undefined) => {
    return roles?.map((role) => role.toLowerCase()).join(', ') || '';
};
