import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

/**
 * Redux Toolkit Query API instance for interacting with the backend.
 *
 * This instance is configured to handle API requests, including automatic token authorization
 * using the token stored in `localStorage` under `USER_LOCALSTORAGE_KEY`.
 *
 * @function rtkApi
 * @returns {Api} An instance of Redux Toolkit Query's `createApi`, configured with a base URL and headers for authentication.
 *
 * @property {string} reducerPath - The path in the Redux store where the API state will be stored. In this case, it's set to `'api'`.
 * @property {BaseQuery} baseQuery - The base query function used to make HTTP requests. It is configured with the base URL and headers.
 * @property {Object} endpoints - An empty object currently, but it can be extended to define API endpoints for data fetching, mutation, etc.
 *
 * ### Headers Configuration:
 * - The `Authorization` header is automatically set with the user's token from `localStorage`.
 */

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
