import { UserRole } from '@/entities/User';

const ROLE_ADMIN = { id: '1', name: 'Admin', color: '#f77' };
const ROLE_USER = {
    id: '2',
    name: 'User',
    color: '#62de85',
};
const ROLE_MANAGER = { id: '3', name: 'Manager', color: '#5ed3f3' };

const ROLE_MAP = {
    admin: ROLE_ADMIN,
    user: ROLE_USER,
    manager: ROLE_MANAGER,
} as const;

type RoleKey = keyof typeof ROLE_MAP;
export const getRoleData = (roles: UserRole[] | undefined) => {
    if (!roles) return null;
    return roles
        .map((role) => {
            const roleLowerCase = role.toLowerCase() as RoleKey;
            return ROLE_MAP[roleLowerCase] || null;
        })
        .filter((roleObject) => roleObject !== null)[0];
};
