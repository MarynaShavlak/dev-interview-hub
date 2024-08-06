#  `initAuthData` Thunk Documentation

The `initAuthData` thunk is an asynchronous action designed to initialize authentication data based on the user ID stored in local storage.
This thunk leverages the `createAsyncThunk` function from Redux Toolkit to manage the asynchronous logic and state management required for fetching user data and setting design preferences.

## Parameters

| Parameter  | Type       | Description                                     |
|------------|------------|-------------------------------------------------|
| `void`     | `void`     | 	This thunk does not require any parameters. |
| `thunkAPI` | `ThunkAPI` | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |

## Returns

`Promise<User>`: 
- **On Success**: Resolves to the user data retrieved from the API.
- **On Error**: If the initialization operation fails, the promise is rejected with an error message  **'Failed to initialize auth data'**.


## Internal Behavior
1. **Retrieve User ID**: Attempts to retrieve the user ID from local storage using the key `USER_LOCALSTORAGE_KEY`.
2. **Validation**: Checks if the user ID is found in local storage. If not, it returns a rejected promise with the message **'No user ID found in local storage.'**.
3. **API Call**: Dispatches the `getUserDataByIdQuery` action with the retrieved user ID to fetch the user data from the API.
4. **Update Local Storage**: Updates the local storage with the appropriate design preference based on the response, using the key `LOCAL_STORAGE_LAST_DESIGN_KEY`.
5. **Return Data**: Returns the user data from the API response.
6. 
## Error Handling
The thunk catches and handles errors during the initialization process. If an error occurs, it logs the error to the console and returns a rejected promise with the message **'Failed to initialize auth data.'**. This ensures that any issues during the initialization process can be identified and addressed promptly.

## Usage Example
The following example demonstrates how to use the `initAuthData` thunk in a React component to initialize and display user authentication data.

```typescript jsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { initAuthData } from '../../model/services/initAuthData';
import { selectUserData } from '../../model/selectors/userSelectors';

export const AuthInitializer = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(selectUserData);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    return (
        <div>
            {userData ? (
                <div>
                    <h1>Welcome, {userData.name}</h1>
                    <p>Design Preference: {userData.features?.isAppRedesigned ? 'New' : 'Old'}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};
```

## Conclusion 
The `initAuthData` thunk provides a robust mechanism for initializing authentication data based on the user ID stored in local storage. It manages the asynchronous API call, processes the response, and updates the application state with the user data and design preference. This thunk is essential for components that require user initialization, ensuring a smooth and secure initialization process with proper error handling and state management.
