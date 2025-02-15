import { UserRole } from '@/entities/User';
import { toggleFeatures } from '@/shared/lib/features';

const adminColor = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => '#f77',
    off: () => '#ce0505',
});

const userColor = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => '#62de85',
    off: () => '#0232c2',
});
const managerColor = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => '#5ed3f3',
    off: () => '#049604',
});

const ROLE_ADMIN = { id: '1', name: 'ADMIN', color: adminColor };
const ROLE_USER = {
    id: '2',
    name: 'USER',
    color: userColor,
};
const ROLE_MANAGER = { id: '3', name: 'MANAGER', color: managerColor };

const ROLE_MAP = {
    admin: ROLE_ADMIN,
    user: ROLE_USER,
    manager: ROLE_MANAGER,
} as const;

export const USER_ROLE_OPTIONS = [ROLE_ADMIN, ROLE_USER, ROLE_MANAGER];

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
