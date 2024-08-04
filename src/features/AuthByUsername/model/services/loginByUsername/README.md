#  `loginByUsername` Thunk Documentation

The `loginByUsername` thunk is an asynchronous action designed to handle user login using a username and password.
This thunk leverages the `createAsyncThunk` function from Redux Toolkit to manage the asynchronous logic and state management required for user authentication.

## Parameters

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `profileId`   | `string`                | The unique identifier of the profile to be fetched. |
| `thunkAPI`   | `ThunkAPI`                | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |

## Returns

`Promise<User>`: 
- **On Success**: Resolves to the authenticated user data.
- **On Error**: If the login operation fails, the promise is rejected with an error message **'Login failed. Please check your username and password and try again.'**.


## Internal Behavior
1. **API Call**: Makes an asynchronous POST request to the **'/login'** endpoint using the **'extra.api'** object, passing in the authData (username and password).
2. **Response Handling**: Checks if the response contains data. If no data is returned, it throws an error with the message **'No data received from login API'**.
3. **Update State**: If the response is successful and contains data, it dispatches the `userActions.setAuthData` action to update the user authentication data in the state.
4. **Return Data**: Returns the authenticated user data from the response.
5. 
## Error Handling

The thunk catches and handles errors during the login process. 
If an error occurs, it logs the error to the console and returns a rejected promise with the message **'Login failed. Please check your username and password and try again.'**. 
This ensures that any issues during the login process can be identified and addressed promptly.

## Usage Example
The following example demonstrates how to use the `loginByUsername` thunk in a React component to fetch and display profile data.

```typescript jsx
import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        try {
            const user = await dispatch(loginByUsername({ username, password }));
            console.log('User logged in:', user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
```

## Conclusion 
The `loginByUsername` thunk provides a robust mechanism for handling user login by username and password. It manages the asynchronous API call, processes the response, and updates the application state with the authenticated user data. This thunk is essential for components that require user authentication, ensuring a smooth and secure login experience with proper error handling and state management.
