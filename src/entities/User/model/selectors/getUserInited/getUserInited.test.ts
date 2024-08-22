import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserInited } from './getUserInited';

describe('getUserInited ', () => {
    test('should return _inited value', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: true,
            },
        };
        expect(getUserInited(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = { user: {} };
        expect(getUserInited(state as StateSchema)).toEqual(undefined);
    });
});
