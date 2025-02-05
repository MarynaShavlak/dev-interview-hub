import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteProfile } from '@/shared/const/router/router';

export const useUserProfileNavigation = () => {
    const navigate = useNavigate();

    const navigateToUserProfile = useCallback(
        (userId: string) => {
            navigate(getRouteProfile(userId));
        },
        [navigate],
    );

    return { navigateToUserProfile };
};
