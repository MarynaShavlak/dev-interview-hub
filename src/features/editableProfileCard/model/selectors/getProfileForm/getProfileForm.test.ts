import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { testProfileData } from '@/entities/Profile/testing';

describe('getProfileForm.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: testProfileData,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(testProfileData);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
