import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData, User } from 'entities/User';
import { getProfileData, Profile } from 'entities/Profile';

export const getCanProfileEdit = createSelector(
    [getUserAuthData, getProfileData],
    (authData, profileData) => authData?.id === profileData?.id,
);
