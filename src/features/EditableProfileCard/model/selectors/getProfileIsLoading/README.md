# Documentation for Profile Loading Selectors

## Overview
These selectors are crafted to provide access to the profile loading state within the Redux store. They offer a streamlined method to manage and monitor the loading status of profile-related operations, allowing components to efficiently respond to changes in the profile loading state.
## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useProfileIsLoading` and `getProfileIsLoading`
```typescript
export const [useProfileIsLoading, getProfileIsLoading] = buildSelector(
        (state: StateSchema) => state.profile?.isLoading,
);
```
- **Purpose**: These selectors provide the current loading status for profile-related operations from the Redux store.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getProfileIsLoading`: A selector function that retrieves the `isLoading` status from the `profile` object within the Redux store.
    - `useProfileIsLoading`: A custom hook that utilizes the `getProfileIsLoading` selector to obtain the loading status directly within React components.
- **Usage**:
    - `getProfileIsLoading`: Use this selector for accessing the profile loading status in non-component code or during server-side logic.
    - `useProfileIsLoading`: Use this custom hook within React components to directly access the profile loading status from the Redux store.


## Usage Example
```typescript jsx
import { useProfileIsLoading } from '@/features/EditableProfileCard';

export function ProfileLoadingIndicator() {
  const isLoading = useProfileIsLoading();

  return (
          <div>
            {isLoading ? (
                    <p>Loading profile...</p>
            ) : (
                    <p>Profile loaded.</p>
            )}
          </div>
  );
}
```

## Conclusion
These selectors provide a convenient way to manage and access the profile's readonly status, facilitating better control over user interactions and data handling within the application. By using these selectors, you ensure that profile editing features are correctly enabled or disabled based on the current state, enhancing user experience and application reliability.
