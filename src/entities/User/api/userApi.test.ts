import fetchMock from 'jest-fetch-mock';
import { setupApiStore } from '../model/services/myTests/rtkQueryTestUtils';
import { getUserDataByIdQuery, userApi } from './userApi';
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
