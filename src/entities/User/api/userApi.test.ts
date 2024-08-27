import fetchMock from 'jest-fetch-mock';
import { setupApiStore } from '../model/services/myTests/rtkQueryTestUtils';
import {
    getUserDataByIdQuery,
    setJsonSettingsMutation,
    userApi,
} from './userApi';
import { Theme } from '@/shared/const/theme';
import { testUserData } from '../testing';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('getUserDataById', () => {
    test('request is correct', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockResponse(JSON.stringify({}));
        // @ts-ignore
        await storeRef.store.dispatch(getUserDataByIdQuery('123'));

        expect(fetchMock).toBeCalledTimes(1);
        const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;
        expect(method).toBe('GET');
        expect(url).toBe(`${__API__}/users/123`);
        expect(headers.get('Authorization')).toBeNull();
    });

    test('successful response', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockResponse(JSON.stringify(testUserData));
        // @ts-ignore
        const action = await storeRef.store.dispatch(
            getUserDataByIdQuery('123'),
        );
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(testUserData);
    });

    test('unsuccessful response', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockReject(new Error('Internal Server Error'));

        // @ts-ignore
        const action = await storeRef.store.dispatch(
            getUserDataByIdQuery('123'),
        );
        const {
            status,
            error: { error },
            isError,
        } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
        expect(error).toBe('Error: Internal Server Error');
    });
});

describe('setJsonSettings', () => {
    test('request is correct', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockResponse(JSON.stringify({}));

        // @ts-ignore
        await storeRef.store.dispatch(
            setJsonSettingsMutation({
                userId: '123',
                jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
            }),
        );

        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        const data = await request.json();
        await expect(data).toStrictEqual({
            jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
        });

        expect(method).toBe('PATCH');
        expect(url).toBe(`${__API__}/users/123`);
    });

    test('successful response', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockResponse(
            JSON.stringify({
                ...testUserData,
                jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
            }),
        );
        // @ts-ignore
        const response = await storeRef.store.dispatch(
            setJsonSettingsMutation({
                userId: '123',
                jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
            }),
        );
        const { data } = response;
        expect(data).toStrictEqual({
            ...testUserData,
            jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
        });
    });
    test('unsuccessful response', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockReject(new Error('Internal Server Error'));

        // @ts-ignore
        const response = await storeRef.store.dispatch(
            setJsonSettingsMutation({
                userId: '123',
                jsonSettings: { theme: Theme.DARK, isFirstVisit: false },
            }),
        );

        const {
            error: { error, status },
        } = response;
        expect(error).toBe('Error: Internal Server Error');
        expect(status).toBe('FETCH_ERROR');
    });
});
