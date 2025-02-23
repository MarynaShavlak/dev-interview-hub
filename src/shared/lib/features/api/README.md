# `updateFeatureFlagsMutation`: API Documentation

## Overview

The `updateFeatureFlagsMutation`  is a mutation endpoint created using `rtkApi` for updating feature flags for a specific user. 
It enables dynamic control of feature availability, enhancing the user experience by allowing for targeted feature rollouts.

## Description
The `updateFeatureFlagsMutation` function sends a `PATCH` request to update feature flags for a specific user. 
This endpoint leverages Redux Toolkit Query for efficient data fetching and state management.

### Import Details
- `rtkApi`: The base API service from **'@/shared/api/rtkApi'**.
- `FeatureFlags`: The type definition for feature flags from **'@/shared/types/featureFlags/featureFlags'**.


###  Parameters
The mutation expects an object containing the following properties:

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `userId`   | `string`                | The unique identifier of the user whose feature flags are to be updated. |
| `features` | `Partial<FeatureFlags>` | An object containing the feature flags to be updated. Only the provided flags will be updated; other flags will remain unchanged. |


### Type Parameters `<void, UpdateFeatureFlagsOptions>`:
The mutation is defined with two type parameters:
1. `void` indicates that the mutation does not expect a response body.
2. `UpdateFeatureFlagsOptions` defines the shape of the argument object that the mutation expects, containing `userId` and `features`.

3. Query Function
The `query` function constructs the request object, setting the URL to `/users/${userId}`, the HTTP method to `PATCH`, and including the `features` object in the request body.

### Exported Mutation
`updateFeatureFlagsMutation` is exported from the module, allowing it to be used in other parts of the application to initiate the mutation.

## Usage Example
This example demonstrates how to use `updateFeatureFlagsMutation` with Redux Toolkit's `createAsyncThunk` to manage feature flags. 
The thunk action dispatches the mutation, merges new and existing feature flags, updates the state, and reloads the page to apply changes, ensuring a seamless user experience.
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import {
    getAllFeatureFlags,
    setFeatureFlags,
} from '../lib/setGetFeatures/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlagsThunk = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>('features/updateFeatureFlagsThunk', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const allFeatures = {
        ...getAllFeatureFlags(),
        ...newFeatures,
    };

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: allFeatures,
            }),
        );
        setFeatureFlags(allFeatures);

        window.location.reload();
        return undefined;
    } catch (e) {
        return rejectWithValue('');
    }
});
```

## Conclusion 
The `updateFeatureFlagsMutation` function provides a flexible and efficient way to update feature flags for users. 
By utilizing the Redux Toolkit Query, this API endpoint ensures smooth state management and data fetching, making it easier to manage feature flags across the application.
The use of type parameters `<void, UpdateFeatureFlagsOptions>` ensures type safety, clearly indicating that no response body is expected and defining the required structure for the mutation's arguments.
