# Documentation for Profile Form  Selectors

## Overview
These selectors are designed to access and retrieve the profile form state from the Redux store. They facilitate efficient management of form-related data within the profile section of the application, offering streamlined access for both component-level and external logic.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useProfileForm` and `getProfileForm`
```typescript
export const [useProfileForm, getProfileForm] = buildSelector(
    (state: StateSchema) => state.profile?.form,
);
```
- **Purpose**: These selectors retrieve the current profile form from the Redux store state.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getProfileForm`: A selector function that returns the  profile form from the `profile` object in the Redux store.
    - `useProfileForm`: A custom hook that uses the `getProfileForm` selector to retrieve the profile data directly within React components.
- **Usage**:
    - `getProfileForm`: Use this selector when you need to access the user profile form data in non-component code or for server-side operations.
    - `useProfileForm`: Use this custom hook within React components to access the user profile form  data directly from the Redux store. 

## Usage Examples
## Example 1: `useProfileForm` in Component
```typescript jsx
import { useProfileForm } from '@/features/editableProfileCard';

export function ProfileFormComponent() {
  const profileForm = useProfileForm();

  return (
          <form>
            <input type="text" value={profileForm?.name || ''} placeholder="Name" />
            <input type="email" value={profileForm?.email || ''} placeholder="Email" />
            {/* Additional form fields */}
          </form>
  );
}
```

## Example 2: Accessing `getProfileForm ` for Server-Side Operations
```typescript jsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
        Profile,
        void,
        ThunkConfig<ValidateProfileError[]>
        >('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const formData = getProfileForm(getState());

  try {
    const response = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
    );

    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
```

## Conclusion
These utilities enable effective retrieval of the profile form state from the Redux store, optimizing form data management within components and other application logic. By leveraging these selectors, you can enhance the efficiency and clarity of form state handling, ensuring a better user experience and cleaner codebase.
