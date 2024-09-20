import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { testProfileData } from '@/entities/Profile/testing';

describe('getProfileData', () => {
    test('should return profile data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: testProfileData,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(testProfileData);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
