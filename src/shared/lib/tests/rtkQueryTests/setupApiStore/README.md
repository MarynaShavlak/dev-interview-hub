# Documentation for `setupApiStore`

## Overview 
The `setupApiStore` function is designed to create and configure a Redux store using Redux Toolkit (`@reduxjs/toolkit`), optimized for API integration. 
This function simplifies the process of setting up a Redux store with API slices, additional reducers, and custom middleware, facilitating a structured approach to managing state and handling API interactions within a Redux-based application.

## Role and Purpose
The primary role of `setupApiStore` is to streamline the setup of a Redux store that includes API slices and any additional reducers. This setup ensures that the store is properly configured with the necessary middleware and reducers, enabling efficient state management and API data handling. This function is especially useful in testing environments where a mock store setup is required to simulate API interactions

## Problem Addressed
Setting up a Redux store with API slices and additional reducers can be complex and error-prone, especially when integrating custom middleware and ensuring the store's configuration is consistent. `setupApiStore` addresses these challenges by providing a unified function to configure the store, reducing boilerplate code and potential configuration errors.

## Solution
`setupApiStore` simplifies the store configuration process by:

1. Combining the API slice reducer with any additional reducers into a root reducer.
2. Configuring the store with default middleware settings and integrating the API slice middleware.
3. Returning an object containing both the configured store and the API slice, ready for use in the application or tests.

## Imports and Dependencies
```typescript
import {
    AnyAction,
    combineReducers,
    configureStore,
    EnhancedStore,
    Middleware,
    Reducer,
} from '@reduxjs/toolkit';
```
- `AnyAction`: A type from Redux Toolkit representing any action object dispatched in the Redux store.
- `combineReducers`: A function from Redux Toolkit that merges multiple reducer functions into a single reducing function, managing different slices of the state.
- `configureStore`: A utility from Redux Toolkit that sets up a Redux store with good defaults, including middleware and reducer management.
- `EnhancedStore`: A type representing a Redux store that is enhanced with middleware and other functionalities, provided by `configureStore`.
- `Middleware`: A type representing Redux middleware functions that can intercept actions dispatched to the store, allowing for custom behavior (e.g., logging, async operations).
- `Reducer`: A type for Redux reducer functions that specify how the state changes in response to actions.
- `ReducersMapObject`: A type representing an object where the keys are slice names and the values are reducer functions for managing corresponding slices of state.
- `StateFromReducersMapObject`: A type that extracts the state type from a `ReducersMapObject`, representing the combined state managed by multiple reducers.

## Interfaces and Types
-   `ApiSlice`: Defines the structure of an API slice, including its reducer, path, middleware, and utility functions.
-   `StoreInterface`: Represents the object returned by `setupApiStore`, containing the API slice and the configured store.
-   `ApiState`: Extracts the state type managed by an `ApiSlice`.
-   `RootState`: Represents the combined state managed by the API slice and additional reducers.
-   `StoreMiddleware`: Extracts the middleware type from an `EnhancedStore`.
-   `StoreType`: Represents the enhanced Redux store type, incorporating both API slice and additional reducers.


## Function definitions 

| Function Name        | Parameters                                                                                              | Returns                                         | Description                                                                                                             |
|----------------------|---------------------------------------------------------------------------------------------------------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `createRootReducer`  | `api: A`<br>`extraReducers?: R`                                                                        | `Reducer`                                      | **Purpose**: Combines the API slice reducer with any extra reducers into a single root reducer.                                 |
|                      | **`A extends ApiSlice<any>`**<br>**`R extends ReducersMapObject`**                                    |                                                 | >**Parameters**:<br>`api`: The API slice containing the reducer and its path.<br>`extraReducers`: Optional additional reducers to include in the root reducer.<br>**Returns**: A combined reducer function. |
| `configureAppStore`  | `api: A`<br>`extraReducers?: R`                                                                        | `EnhancedStore`                                | **Purpose**: Configures the Redux store with the root reducer and middleware.                             |
|                      | **`A extends ApiSlice<any>`**<br>**`R extends ReducersMapObject`**                                    |                                                 | **Parameters**:<br>`api`: The API slice object.<br>`extraReducers`: Optional additional reducers to integrate into the store.<br>**Returns**: An `EnhancedStore` instance with the configured reducers and middleware. |
| `setupApiStore`      | `api: A`<br>`extraReducers?: R`                                                                        | `StoreInterface`                               | **Purpose**: Initializes and returns a Redux store instance, along with the API slice object.                             |
|                      | **`A extends ApiSlice<any>`**<br>**`R extends ReducersMapObject = Record<never, never>`**             |                                                 | **Parameters**:<br>`api`: The API slice to be integrated into the store.<br>`extraReducers`: Optional additional reducers to include.<br>**Returns**: An object containing:<br>`api`: The provided API slice.<br>`store`: The configured Redux store instance. |


## Usage Example
```typescript
import fetchMock from 'jest-fetch-mock';
import { setupApiStore } from '../../../shared/lib/tests/rtkQueryTests/setupApiStore/setupApiStore';
import { getUserDataByIdQuery, userApi } from './userApi';
import { testUserData } from '../testing';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('getUserDataById', () => {
    test('should handle successful response', async () => {
        const storeRef = setupApiStore(userApi);
        fetchMock.mockResponse(JSON.stringify(testUserData));
        // @ts-ignore
        const action = await storeRef.store.dispatch(getUserDataByIdQuery('123'));
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(testUserData);
    });

});
```

## Conclusion
The `setupApiStore` function provides a streamlined way to configure a Redux store with API slices and additional reducers. It simplifies the setup process, making it easier to manage state and API interactions in a Redux-based application, and is particularly useful for testing scenarios.
