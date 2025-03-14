import { signOut } from 'firebase/auth';
import { logoutUser } from './logoutUser';
import { userActions } from '../../slices/userSlice';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { clearUserDataFromStorage } from '../../../lib/userUtils/userUtils';

// Mock Firebase signOut
jest.mock('firebase/auth', () => ({
    signOut: jest.fn(),
}));

// Mock clearUserDataFromStorage
jest.mock('../../../lib/userUtils/userUtils', () => ({
    clearUserDataFromStorage: jest.fn(),
}));

// Mock console.error
const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock ERROR_USER_MESSAGES (adjust this based on your actual consts)
const ERROR_USER_MESSAGES = {
    LOGOUT_ERROR: 'Logout failed',
} as const;

describe('async thunk logoutUser test', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        consoleErrorSpy.mockClear();
    });

    test('should dispatch logout action and clear storage on success', async () => {
        // Mock successful signOut
        (signOut as jest.Mock).mockResolvedValueOnce(undefined);

        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123');

        const result = await thunk.callThunk(undefined);

        expect(signOut).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.logout());
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // Thunk dispatch + logout action
        expect(clearUserDataFromStorage).toHaveBeenCalled();
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull(); // Assuming clearUserDataFromStorage clears this
        expect(result).toBe(undefined);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle logout failure and log error', async () => {
        // Mock signOut to fail
        const mockError = new Error('Auth error');
        (signOut as jest.Mock).mockRejectedValueOnce(mockError);

        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123');

        const result = await thunk.callThunk(undefined);

        expect(signOut).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(1); // Only thunk dispatch, no logout
        expect(clearUserDataFromStorage).not.toHaveBeenCalled();
        // expect(result.meta.requestStatus).toBe('rejected');
        expect(result).toBe(ERROR_USER_MESSAGES.LOGOUT_ERROR); // 'Logout failed'
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123'); // Storage unchanged
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            ERROR_USER_MESSAGES.LOGOUT_ERROR,
            mockError,
        );
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });
});
