import { logoutUser } from './logoutUser';
import { userActions } from '../../../model/slice/userSlice';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('async thunk logoutUser test', () => {
    beforeEach(() => {
        // Clear local storage mock before each test
        localStorage.clear();
    });

    test('should dispatch logout action and clear storage', async () => {
        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toEqual(
            'userId123',
        );
        await thunk.callThunk();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.logout());
        expect(localStorage.getItem('USER_LOCALSTORAGE_KEY')).toBeNull();
    });

    test('should handle logout failure', async () => {
        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toEqual(
            'userId123',
        );
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Logout failed');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toEqual(
            'userId123',
        );
    });
});
