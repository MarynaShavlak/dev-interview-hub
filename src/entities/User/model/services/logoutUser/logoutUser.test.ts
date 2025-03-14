import { signOut } from 'firebase/auth';
import { logoutUser } from './logoutUser';
import { userActions } from '../../slices/userSlice';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { clearUserDataFromStorage } from '../../../lib/userUtils/userUtils';

// Mock Firebase auth module
jest.mock('firebase/auth', () => {
    const mockSignOut = jest.fn();
    return {
        signOut: mockSignOut,
        getAuth: jest.fn(() => ({})),
    };
});

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
        removeItem: (key: string) => {
            delete store[key]; // Add removeItem to delete the key
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock ERROR_USER_MESSAGES
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
        // Access the mocked signOut directly from the import
        (signOut as jest.Mock).mockResolvedValueOnce(undefined);
        (clearUserDataFromStorage as jest.Mock).mockImplementation(() => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        });

        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123');

        const result = await thunk.callThunk(undefined);

        expect(signOut).toHaveBeenCalledWith(thunk.mockAuth);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.logout());
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(clearUserDataFromStorage).toHaveBeenCalled();
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();
        if (typeof result !== 'string') {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(undefined);
        }
        // Success returns undefined
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle logout failure and log error', async () => {
        const mockError = new Error('Auth error');
        (signOut as jest.Mock).mockRejectedValueOnce(mockError);

        const thunk = new TestAsyncThunk(logoutUser);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'userId123');
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123');

        const result = await thunk.callThunk(undefined);

        expect(signOut).toHaveBeenCalledWith(thunk.mockAuth);
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(clearUserDataFromStorage).not.toHaveBeenCalled();
        expect(result).toBe(ERROR_USER_MESSAGES.LOGOUT_ERROR);
        expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe('userId123');
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            ERROR_USER_MESSAGES.LOGOUT_ERROR,
            mockError,
        );
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });
});
