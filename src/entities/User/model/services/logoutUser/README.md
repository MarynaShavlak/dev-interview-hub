# `logoutUser` Thunk Documentation

The `logoutUser` thunk is an asynchronous action designed to handle the user logout process. It clears the user's session both from the Redux store and from any persistent storage. This thunk utilizes the `createAsyncThunk` function from Redux Toolkit to manage the asynchronous logic and ensure a clean and consistent logout operation.

## Parameters

| Parameter  | Type       | Description                                     |
|------------|------------|-------------------------------------------------|
| `void`     | `void`     | This thunk does not require any parameters.    |
| `thunkAPI` | `ThunkAPI` | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |

## Returns

`Promise<void>`:
- **On Success**: Resolves once the logout process is complete and user data is cleared from both the Redux store and persistent storage.
- **On Error**: If the logout process encounters an error, the promise is rejected with the error message **'Logout failed'**.

## Internal Behavior
1. **Clear User Data from Store**: Dispatches the `userActions.logout()` action to clear the user's session from the Redux store.
2. **Clear User Data from Storage**: Calls the `clearUserDataFromStorage()` function to remove user data from any persistent storage.
3. **Error Handling**: Catches any errors that occur during the process, logs them to the console, and returns a rejected promise with a custom error message.

## Error Handling
The thunk includes error handling to manage any issues that may arise during the logout process. If an error occurs:
- It logs the error to the console for debugging purposes.
- It returns a rejected promise with the message **'Logout failed'**. This approach helps in identifying issues and ensures that any problems during the logout process are properly communicated.

## Usage Example
The following example demonstrates how to use the `logoutUser` thunk in a React component to handle user logout:

```typescript jsx
import React from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { logoutUser } from '../../model/services/logoutUser';

export const LogoutButton = () => {
    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};
```

## Conclusion 
The `logoutUser` thunk plays a crucial role in managing the user logout process. By handling both the removal of user data from the Redux store and persistent storage, it ensures that the user's session is completely terminated. This thunk provides a reliable mechanism for logging out users, with built-in error handling to address any issues that may arise during the process. It is essential for applications that require secure and thorough logout functionality, contributing to a smooth user experience and effective session management.
