import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getAuthData', () => {
    test('should return authData', () => {
        const authData = {
            username: 'username',
            id: 'user123',
        };
        const state: DeepPartial<StateSchema> = {
            user: {
                authData,
            },
        };
        expect(getUserAuthData(state as StateSchema)).toEqual(authData);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
    });
});
