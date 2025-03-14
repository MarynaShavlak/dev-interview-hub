import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { testUserData } from '@/entities/User/testing';

describe('getProfileForm', () => {
    test('should return profile form data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: testUserData,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(testUserData);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
