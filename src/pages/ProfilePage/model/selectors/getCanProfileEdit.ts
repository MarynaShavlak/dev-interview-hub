import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from 'entities/User';
import { getProfileData } from 'entities/Profile';

export const getCanProfileEdit = createSelector(
    [getUserAuthData, getProfileData],
    (authData, profileData) => {
        if (!authData || !profileData) {
            return false;
        }
        return authData?.id === profileData?.id;
    },
);
