export {
    getUserAuthData, useUserAuthData,
} from './model/selectors/getUserAuthData/getUserAuthData';
export {
    getUserInited, useUserInited,
} from './model/selectors/getUserInited/getUserInited';
export { useUserRoles, isUserAdmin, isUserManager } from './model/selectors/roleSelectors';
export {
    userReducer,
    userActions,
    useUserActions,
} from './model/slice/userSlice';
export type {
    UserSchema,
    User,
} from './model/types/user';

export {
    UserRole,
} from './model/consts/consts';
