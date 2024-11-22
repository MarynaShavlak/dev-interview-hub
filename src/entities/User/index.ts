export { updateUserDataMutation } from './api/userApi';

export { getProfileData } from '@/features/EditableProfileCard/model/services/getProfileData/getProfileData';
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
} from './model/slices/userSlice';
export type { UserSchema, User } from './model/types/user';
export type { JsonSettings } from './model/types/jsonSettings';
export { UserRole } from './model/consts/consts';
export { logoutUser } from './model/services/logoutUser/logoutUser';
export { handleUserAuthentication } from './lib/userUtils/userUtils';
export { useUsers } from './api/userApi';
