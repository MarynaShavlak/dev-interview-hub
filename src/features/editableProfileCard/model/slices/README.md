# Documentation for 'profileSlice'

## Overview
The `profileSlice` is a Redux slice designed to manage the profile data and its editing state within an application. 
Utilizing custom `buildSlice` function, it manages various aspects of profile information, including loading states, error handling, and editing functionalities. 
This slice integrates with asynchronous thunks to fetch and update profile data.

## Import Statements
```typescript
import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

```
- `PayloadAction`: A type from Redux Toolkit used to define the shape of action payloads.
- `buildSlice`: A custom utility function for creating Redux slices.
- `Profile`: A TypeScript type representing the profile data structure.
- `ProfileSchema`: A TypeScript type defining the schema for profile state.
- `fetchProfileData`: An asynchronous thunk action for fetching profile data.
- `updateProfileData`: An asynchronous thunk action for updating profile data.


## Initial State
```typescript
const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
};
```

The initial state of the slice is defined using the `ProfileSchema` type.
It includes:
- `readonly`: A boolean indicating if the profile is in read-only mode.
- `isLoading`: A boolean indicating if profile data is currently being loaded.
- `error`: An optional property for storing error messages.
- `data`: An optional property holding the profile data

## Slice Definition

- **name**: The name of the slice, which is 'profile'.
- **initialState**: The initial state defined earlier.
- **reducers**: An object containing reducer functions.
- **extraReducers**: An object containing extraReducer functions for async operations.
- 
## Reducers

| **Reducer Name**    | **Description**                                                                 | **Payload**                            | **State Changes**                                                 |
|---------------------|---------------------------------------------------------------------------------|----------------------------------------|--------------------------------------------------------------------|
| `setReadonly`       | Toggles the read-only state of the profile.                                     | `boolean` indicating read-only status  | Sets `readonly` to the payload value.                             |
| `cancelEdit`        | Reverts any changes made during editing and resets the form to the original data. | None                                   | Sets `readonly` to `true`, clears `validateErrors`, and resets `form` to `data`. |
| `updateProfile`     | Updates the profile form with new data.                                          | `Profile` object with updated data     | Merges the payload into `form` while keeping existing values.      |


## Extra Reducers

| **Action**                   | **Description**                                                                 | **Payload**                            | **State Changes**                                                 |
|------------------------------|---------------------------------------------------------------------------------|----------------------------------------|--------------------------------------------------------------------|
| `fetchProfileData.pending`   | Indicates that the profile data is being fetched.                               | None                                   | Sets `isLoading` to `true` and clears any existing `error`.        |
| `fetchProfileData.fulfilled` | Handles successful fetching of profile data.                                    | `Profile` object with fetched data     | Updates `data` and `form` with the fetched profile data, and sets `isLoading` to `false`. |
| `fetchProfileData.rejected`  | Handles errors encountered while fetching profile data.                         | Error information                      | Sets `isLoading` to `false` and updates `error` with the payload.  |
| `updateProfileData.pending`  | Indicates that the profile data is being updated.                               | None                                   | Clears `validateErrors` and sets `isLoading` to `true`.            |
| `updateProfileData.fulfilled`| Handles successful updating of profile data.                                    | `Profile` object with updated data     | Updates `data` and `form` with the updated profile data, sets `readonly` to `true`, and clears `validateErrors`. |
| `updateProfileData.rejected` | Handles errors encountered while updating profile data.                        | Error information                      | Sets `isLoading` to `false` and updates `validateErrors` with the payload. |


## Exports
```typescript
export const {
    actions: profileActions,
    reducer: profileReducer,
    useActions: useProfileActions,
} = profileSlice;
```
- **profileActions**: An object containing the action creators generated by the slice.
- **profileReducer**: The reducer function to be used in the Redux store.
- **useProfileActions**: A custom hook to use the actions in a React component.


## Usage Example

```typescript jsx
import { useProfileActions, profileReducer } from '@/path/to/profileSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
});

// Dispatching an actions

import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProfileActions } from './/profileSlice';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

export const EditableProfileCardHeader = () => {
    const readonly = useProfileReadonly();
    const dispatch = useAppDispatch();

    const onSave = useCallback(() => dispatch(updateProfileData()), [dispatch]);
    const onEdit = useCallback(() => setReadonly(false), [setReadonly]);
    const onCancelEdit = useCallback(() => cancelEdit(), [cancelEdit]);

    return (
        <div>
            {readonly ? (<button onClick={onEdit}> Edit Profile </button>)
                : (<div>
                    <button onClick={onCancelEdit}> Cancel</button>
                    <button onClick={onSave}> Save</button>
                </div>)
            }
        </div>
    );
};
```

## Conclusion 
The `profileSlice` effectively manages profile data and its editing state in a Redux-based application. 
It provides a structured approach to handle loading states, errors, and form updates, ensuring that profile management is streamlined and maintainable. 
By integrating `fetchProfileData` and `updateProfileData` thunks, this slice supports asynchronous operations, enhancing the user experience with seamless data fetching and updating. 
Utilizing this slice can simplify profile-related state management, leading to a more robust and user-friendly application.
