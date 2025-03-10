# Documentation for Login Loading Selectors

## Overview
These selectors are crafted to provide access to the login loading state within the Redux store. They offer a streamlined method to manage and monitor the loading status of login-related operations, allowing components to efficiently respond to changes in the login loading state.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useLoginIsLoading` and `getLoginIsLoading`
```typescript
export const [useLoginIsLoading, getLoginIsLoading] = buildSelector(
        (state: StateSchema) => state?.loginForm?.isLoading || false,
);
```
- **Purpose**: These selectors provide the current loading status for login-related operations from the Redux store.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getLoginIsLoading`: A selector function that retrieves the `isLoading` status from the `loginForm` object within the Redux store.
    - `useLoginIsLoading`: A custom hook that utilizes the `getLoginIsLoading` selector to obtain the loading status directly within React components.
- **Usage**:
    - `getLoginIsLoading`: Use this selector for accessing the login loading status in non-component code or during server-side logic.
    - `useLoginIsLoading`: Use this custom hook within React components to directly access the login loading status from the Redux store.


## Usage Example
```typescript jsx
import { useLoginIsLoading } from '@/features/AuthByUsername';

export function LoginLoadingIndicator() {
  const isLoading = useLoginIsLoading();

  return (
          <div>
            {isLoading ? (
                    <p>Loading login...</p>
            ) : (
                    <p>Login loaded</p>
            )}
          </div>
  );
}
```

## Conclusion
These selectors provide a convenient way to manage and access the login's loading status, facilitating better control over user interactions and data handling within the application. By using these selectors, you ensure that login operations are correctly managed based on the current state, enhancing user experience and application reliability.
