#  `fetchProfileData` Thunk Documentation

The `fetchProfileData`  thunk is an asynchronous action designed to retrieve profile data for a given profile ID from the backend. 
This thunk leverages the `createAsyncThunk` function from Redux Toolkit to handle the asynchronous logic and state management.

## Parameters

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `profileId`   | `string`                | TThe unique identifier of the profile to be fetched. |

## Returns

`Promise<Profile>`: 
- **On Success**: Resolves to the profile data object containing the profile details fetched from the backend.
- **On Error**: If the fetch operation fails, the promise is rejected with an error message **'Failed to fetch profile data'**.



## Internal Behavior
1. **API Call**: Makes an asynchronous GET request to the **'/profile/${profileId}'** endpoint using the **'extra.api'** object.
2. **Response Handling**: Checks if the response contains data. If no data is returned, it throws an error.
3. **Return Data**: If the response is successful and contains data, it returns the profile data.
4. **Refreshing the Page**: Since feature flags are not reactive and do not trigger automatic updates in the interface, the application is reloaded using `window.location.reload()`. This ensures that the updated feature flags are applied consistently throughout the application.

## Error Handling

The thunk catches and handles errors during the fetch process. If an error occurs, it logs the error to the console and returns a rejected promise with the message **'Failed to fetch profile data'**. This ensures that any issues during the data fetch can be identified and addressed promptly.

## Usage Example
The following example demonstrates how to use the `fetchProfileData` thunk in a React component to fetch and display profile data.

```typescript jsx
import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo(({ className, id }: EditableProfileCardProps) => {
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    return (
        <div className={className}>
            {/* Add your component's rendering logic here */}
        </div>
    );
});
```

## Conclusion 
The `fetchProfileData` thunk provides a reliable mechanism for fetching profile data from the backend using a profile ID. It handles the asynchronous API call, processes the response, and manages errors effectively. This thunk is essential for components that require dynamic profile data retrieval, ensuring a seamless user experience with proper error handling and state management.
