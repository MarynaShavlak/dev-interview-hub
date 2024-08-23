export { initAuthData } from './model/services/initAuthData/initAuthData';
export { saveJsonSettings } from './model/services/saveJsonSettings/saveJsonSettings';
export {
    getUserAuthData,
    useUserAuthData,
    getUserInited,
    useUserInited,
    useUserRoles,
    isUserAdmin,
    isUserManager,
    useJsonSettings,
} from './model/selectors';
export {
    userReducer,
    userActions,
    useUserActions,
} from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
export { UserRole } from './model/consts/consts';
export { clearUserDataFromStorage } from './lib/userUtils/userUtils';
