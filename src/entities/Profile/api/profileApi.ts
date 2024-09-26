import { rtkApi } from '@/shared/api/rtkApi';
import { Profile } from '../model/types/profile';

export const profileApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfiles: build.query<Profile[], null>({
            query: () => ({
                url: '/profile',
            }),
        }),
    }),
});

export const useProfiles = profileApi.useGetProfilesQuery;
