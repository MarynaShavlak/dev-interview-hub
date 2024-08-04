# Documentation for Login Username Selectors

## Overview
These selectors are designed to access and retrieve the login username from the Redux store. They streamline the management of the login state within the application, providing efficient data retrieval mechanisms for login-related operations.
## Import Statements
```typescript
export const [useLoginUsername, getLoginUsername] = buildSelector(
        (state: StateSchema) => state?.loginForm?.username || '',
);
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useLoginUsername` and `getLoginUsername`
```typescript
export const [useProfileData, getProfileData] = buildSelector(
    (state: StateSchema) => state.profile?.data,
);
```
- **Purpose**: These selectors retrieve the current profile data from the Redux store state.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getLoginUsername`: A selector function that returns the login username from the `loginForm` object in the Redux store.
    - `useLoginUsername`: A custom hook that uses the `getLoginUsername` selector to retrieve the login username directly within React components.
- **Usage**:
    - `getLoginUsername`: Use this selector when you need to access the  user login username in non-component code or for server-side operations.
    - `useLoginUsername`: Use this custom hook within React components to access the user login username directly from the Redux store. 

## Usage Examples
`useLoginUsername` in Component
```typescript jsx
import { useLoginUsername } from '@/features/AuthByUsername';

export function LoginUsernameComponent() {
  const username = useLoginUsername();

  return (
          <div>
            {username ? (
                    <p>Username: {username}</p>
            ) : (
                    <p>No username set.</p>
            )}
          </div>
  );
}
```


## Conclusion
These utilities help in retrieving the login username from the Redux state, making login state management efficient and streamlined within components and other parts of the application. By utilizing these selectors, you can effectively manage login data, ensuring a seamless user experience and efficient data handling.
