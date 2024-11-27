# Documentation for User Authentication Selectors

## Overview
These selectors are designed to access and retrieve the user authentication data from the Redux store. They facilitate the management of user authentication state within the application, ensuring efficient data retrieval for user-related operations.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useUserAuthData` and `getUserAuthData`
```typescript
export const [useUserAuthData, getUserAuthData] = buildSelector(
        (state: StateSchema) => state.user.authData,
);
```
- **Purpose**: These selectors retrieve the current user authentication data from the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**: 
  - `getUserAuthData`: A selector function that returns the authentication data from the `user` object in the Redux store.
  - `useUserAuthData`: A custom hook that uses the `getUserAuthData` selector to retrieve the authentication data directly within React components.
- **Usage**:
  - `getUserAuthData`: Use this selector when you need to access the user authentication data in non-component code or for server-side operations.
  - `useUserAuthData`: Use this custom hook within React components to access the user authentication data directly from the Redux store. This hook simplifies user authentication state management within components.


## Usage Examples 
## Example 1: `useUserAuthData` in Component
```typescript jsx
import { useUserAuthData } from '@/entities/User';

export function UserProfile() {
  const userAuthData = useUserAuthData();

  return (
          <div>
            {userAuthData ? (
                    <p>Welcome, {userAuthData.username}!</p>
            ) : (
                    <p>Please log in.</p>
            )}
          </div>
  );
}
```

## Example 2: Accessing `getUserAuthData` for Server-Side Operations
```typescript jsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettingsThunk = createAsyncThunk<
        JsonSettings,
        JsonSettings,
        ThunkConfig<string>
        >(
        'user/saveJsonSettingsThunk',
        async (newJsonSettings, { rejectWithValue, getState, dispatch }) => {
          const state = getState();
          const userData = getUserAuthData(state);
          if (!userData) return rejectWithValue('No user data');

          try {
            const response = await dispatch(setJsonSettingsMutation({
              userId: userData.id,
              jsonSettings: { ...getJsonSettings(state), ...newJsonSettings },
            })).unwrap();

            if (!response.jsonSettings) return rejectWithValue('No settings info');

            return response.jsonSettings;
          } catch {
            return rejectWithValue('Error saving settings');
          }
        }
);
```

## Conclusion 
These utilities help in retrieving user authentication data from the Redux state, making user state management efficient and streamlined within components and other parts of the application.
By utilizing these selectors, you can effectively manage user authentication state, ensuring a seamless and secure user experience.
