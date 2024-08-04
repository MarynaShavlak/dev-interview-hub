#  `updateProfileData` Thunk Documentation

The `updateProfileData` thunk is an asynchronous action responsible for updating profile data on the server. It validates the profile data, performs an API call to update the data, and manages potential errors during the process.
## Parameters
This thunk does not require any parameters, except `thunkApi`. The thunk uses the current state to fetch profile data and validate it.

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `thunkAPI`   | `ThunkAPI`                | The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more. |


## Returns

`Promise<Profile>`: 
- **On Success**: Resolves to the updated profile data object returned from the API.
- **On Error**: If the update operation fails or validation errors occur, the promise is rejected with an array of error messages, including **'SERVER_ERROR'** if the API call fails.


## Internal Behavior
1. **Form Data Retrieval**: Retrieves the current profile form data from the state using `getProfileForm` selector.
2. **Data Validation**: Validates the form data using `validateProfileData` function. If there are validation errors, the thunk rejects with these errors.
3. **API Call**: Makes an asynchronous PUT request to update the profile data on the server.
4. **Response Handling**: CChecks if the response contains data. If no data is returned, it throws an error.

## Error Handling
The thunk handles errors by catching them during the API call or validation process. If validation errors are found, they are returned as a rejected promise. If the API call fails or returns no data, it logs the error and returns a rejection with a server error message.

## Usage Example
Here's how to use the `updateProfileData` thunk within a React component to handle profile updates:
```typescript jsx
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

const ProfileUpdateButton = () => {
    const dispatch = useAppDispatch();

    const handleUpdate = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return <button onClick={handleUpdate}>Update Profile</button>;
};

export default ProfileUpdateButton;
```

## Conclusion 
The `updateProfileData` thunk provides a robust mechanism for updating profile data. It integrates validation, API communication, and error handling into a single asynchronous action. This approach ensures that profile data updates are validated and managed efficiently, with clear error reporting to maintain a reliable user experience.
