import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { testUserData } from '@/entities/User/testing';

describe('getProfileData', () => {
    test('should return profile data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: testUserData,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(testUserData);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
