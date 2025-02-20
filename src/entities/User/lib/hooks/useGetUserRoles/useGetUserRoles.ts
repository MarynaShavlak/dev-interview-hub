import { useSelector } from 'react-redux';
import {
    isUserAdmin,
    isUserManager,
} from '../../../model/selectors/roles/roleSelectors';

export const useGetUserRoles = () => {
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    return { isAdmin, isManager };
};
