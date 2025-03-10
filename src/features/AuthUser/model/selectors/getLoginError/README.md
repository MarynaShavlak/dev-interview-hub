# Documentation for Login Error Selectors

## Overview
These selectors are designed to access and retrieve login error information from the Redux store. They simplify the management of login-related error states within the application, ensuring that components can efficiently access and react to any errors associated with user login operations.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useLoginError` and `getLoginError`
```typescript
export const [useLoginError, getLoginError] = buildSelector(
        (state: StateSchema) => state?.loginForm?.error,
);
```
- **Purpose**: These selectors retrieve the current login error from the Redux store state.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getLoginError`: A selector function that returns the  profile error from the `loginForm` object in the Redux store.
    - `useLoginError`: A custom hook that uses the `getLoginError` selector to retrieve the login error directly within React components.
- **Usage**:
    - `getLoginError`: Use this selector when you need to access the user login error in non-component code or for server-side operations.
    - `useLoginError`: Use this custom hook within React components to access the user login error directly from the Redux store. 


## Usage Example
```typescript jsx
import { useLginError } from '@/features/AuthByUsername';

export function LoginErrorComponent() {
  const loginError = useLoginError();

  return (
          <div>
            {loginError ? (
                    <p>Error: {loginError.message}</p>
            ) : (
                    <p>No errors found.</p>
            )}
          </div>
  );
}
```

## Conclusion
These utilities facilitate the retrieval of login error information from the Redux state, making error management more efficient and streamlined within components and other parts of the application. By using these selectors, you can effectively handle login-related errors, ensuring better user feedback and a more robust application.
