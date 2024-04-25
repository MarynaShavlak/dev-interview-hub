import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('success login', async () => {
        const userValue = { username: 'afff', id: '12' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'afff', password: '123' });
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const userValue = { username: 'afff', id: '12' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'afff', password: '123' });
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});

// test('success login', async () => {
//     const userValue = { username: 'afff', id: '12' };
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
//     const action = loginByUsername({ username: 'afff', password: '123' });
//     const result = await action(dispatch, getState, undefined);
//     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(mockedAxios.post).toHaveBeenCalledTimes(3);
//     expect(result.meta.requestStatus).toBe('fulfilled');
//     expect(result.payload).toEqual(userValue);
// });
//
// test('error login', async () => {
//     const userValue = { username: 'afff', id: '12' };
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
//     const action = loginByUsername({ username: 'afff', password: '123' });
//     const result = await action(dispatch, getState, undefined);
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(mockedAxios.post).toHaveBeenCalledTimes(2);
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('error');
// });
