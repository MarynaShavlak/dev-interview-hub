export { userFirebaseApi } from './api/userApi';

export { ERROR_USER_MESSAGES } from './model/consts/errorUserMessages';

export { useGetUserRoles } from '@/entities/User/lib/hooks/useGetUserRoles/useGetUserRoles';

export { deleteUserThunk } from './model/services/deleteUserThunk/deleteUserThunk';

export { useUserProfileNavigation } from './lib/hooks/useUserProfileNavigation/useUserProfileNavigation';

export { updateUserDataMutation, getUserDataByIdQuery } from './api/userApi';
export { initAuthData } from './model/services/initAuthData/initAuthData';
export { saveJsonSettingsThunk } from '@/entities/User/model/services/saveJsonSettingsThunk/saveJsonSettingsThunk';
export {
    getUserAuthData,
    useUserAuthData,
    getUserInited,
    useUserInited,
    useUserRoles,
    // isUserAdmin,
    // isUserManager,
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
