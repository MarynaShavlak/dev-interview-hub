# Documentation for Profile Readonly  Selectors

## Overview
These selectors are designed to access the readonly status of the profile within the Redux store. They provide an efficient way to determine whether the profile is in a readonly state, which is essential for controlling user interactions and ensuring data integrity.
## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useProfileReadonly` and `getProfileReadonly`
```typescript
export const [useProfileReadonly, getProfileReadonly] = buildSelector(
        (state: StateSchema) => state.profile?.readonly,
);
```
- **Purpose**: These selectors retrieve the readonly status of the profile from the Redux store.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getProfileReadonly`: A selector function that retrieves the `readonly` status from the `profile` object within the Redux store.
    - `useProfileReadonly`: A custom hook that utilizes the `getProfileReadonly` selector to fetch the readonly status directly within React components.
- **Usage**:
    - `getProfileReadonly`: Utilize this selector for accessing the profile readonly status outside of React components or in server-side logic.
    - `useProfileReadonly`: Use this custom hook in React components to directly access the profile readonly status from the Redux store.


## Usage Example
```typescript jsx
import { useProfileReadonly } from '@/features/editableProfileCard';

export function ProfileEditButton() {
  const isReadonly = useProfileReadonly();

  return (
          <div>
            {isReadonly ? (
                    <button disabled>Edit Profile</button>
            ) : (
                    <button>Edit Profile</button>
            )}
          </div>
  );
}
```

## Conclusion
These selectors enhance the management of the profile loading state by providing straightforward access methods for components and other application parts. By employing these selectors, you can efficiently track and respond to profile loading status, leading to improved user experiences and more maintainable code.
