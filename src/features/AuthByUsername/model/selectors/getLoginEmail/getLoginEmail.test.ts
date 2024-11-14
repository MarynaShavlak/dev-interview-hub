import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginEmail } from './getLoginEmail';

describe('getLoginEmail.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                email: 'mmm@gmail.com',
            },
        };
        expect(getLoginEmail(state as StateSchema)).toEqual('mmm@gmail.com');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginEmail(state as StateSchema)).toEqual('');
    });
});
