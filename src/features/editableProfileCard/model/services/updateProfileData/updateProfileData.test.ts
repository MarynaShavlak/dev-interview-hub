import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateProfileError } from '../../consts/consts';
import { updateProfileData } from './updateProfileData';
import { testProfileData } from '@/entities/Profile/testing';

describe('async thunk updateProfileData test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('success updating profile data', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });

        thunk.api.put.mockReturnValue(
            Promise.resolve({ data: testProfileData }),
        );

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${testProfileData.id}`,
            testProfileData,
        );
        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testProfileData);
    });

    test('error updating profile data with 403 status', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${testProfileData.id}`,
            testProfileData,
        );
        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error with incorrect user data', async () => {
        const invalidProfileData = { ...testProfileData, lastname: '' };
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: invalidProfileData,
            },
        });

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('error with multiple validation issues', async () => {
        const invalidProfileData = {
            ...testProfileData,
            firstname: '',
            username: '',
            age: undefined,
        };
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: invalidProfileData,
            },
        });

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('error updating profile data with network error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });

        thunk.api.put.mockReturnValue(
            Promise.reject(new Error('Network Error')),
        );

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${testProfileData.id}`,
            testProfileData,
        );
        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('error updating profile data with missing data in response', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${testProfileData.id}`,
            testProfileData,
        );
        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('multiple simultaneous profile update requests', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });

        thunk.api.put.mockReturnValue(
            Promise.resolve({ data: testProfileData }),
        );

        const results = await Promise.all([
            thunk.callThunk(),
            thunk.callThunk(),
            thunk.callThunk(),
        ]);

        results.forEach((result) => {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(testProfileData);
        });

        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${testProfileData.id}`,
            testProfileData,
        );
        expect(thunk.api.put).toHaveBeenCalledTimes(3);
    });

    test('error with incomplete profile data but valid according to validation rules', async () => {
        const incompleteProfileData = { ...testProfileData, city: undefined };
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: incompleteProfileData,
            },
        });

        thunk.api.put.mockReturnValue(
            Promise.resolve({ data: incompleteProfileData }),
        );

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(thunk.api.put).toHaveBeenCalledWith(
            `/profile/${incompleteProfileData.id}`,
            incompleteProfileData,
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(incompleteProfileData);
    });

    test('error when profile id is missing', async () => {
        const profileDataWithoutId = { ...testProfileData, id: undefined };
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: profileDataWithoutId,
            },
        });

        const result = await thunk.callThunk();

        expect(thunk.api.put).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('error updating profile data with 401 status', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: testProfileData,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 401 }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });
});
