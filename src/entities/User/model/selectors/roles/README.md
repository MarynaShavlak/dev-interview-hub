# Documentation for roles selectors

## Overview
These selectors are used to access and retrieve user roles from the Redux store. 
They help in determining the user's role(s) within the application and are designed to work with the `authData` slice of the user state.

## Import Statements
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/consts';
```
- `createSelector`: A function from Redux Toolkit used to create memoized selectors.
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.
- `UserRole`: An enumeration  defining the different user roles in the application.

## Selectors

### `useUserRoles` and `getUserRoles`
```typescript
export const [useUserRoles, getUserRoles] = buildSelector(
        (state: StateSchema) => state.user.authData?.roles,
);
```
- **Purpose**: These selectors retrieve the user's roles from the `authData` object in the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**: 
  - `getUserRoles`: A selector function that returns the roles array from the `authData` object in the Redux store.
  - `useUserRoles`: A custom hook that uses the `getUserRoles` selector to retrieve the roles array directly within React components.
  - **Usage**:
    - `getUserRoles`: Use this selector when you need to access the user's roles in non-component code or for server-side operations.
    - `useUserRoles`: Use this custom hook within React components to access the user's roles directly from the Redux store. This hook simplifies integrating role-based logic in components, enabling conditional rendering or access control based on the user's roles


### `isUserAdmin`
```typescript
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
```
- **Purpose**: This selector checks if the user has the `ADMIN` role.
- **Parameters**:
  - **First Argument**: `getUserRoles` selector, which provides the user's roles array.
  - **Second Argument**: A function that checks if the `ADMIN` role is present in the roles array and returns a boolean value.
- **Returns**: `true` if the user has the `ADMIN` role; otherwise, `false`.
- **Usage**: Use this selector when you need to determine if the user has administrative privileges.
   It helps in conditionally rendering admin-specific components or features, and in implementing role-based access control within the application.

### `isUserManager`
```typescript
export const isUserManager = createSelector(getUserRoles, (roles) =>
        Boolean(roles?.includes(UserRole.MANAGER)),
);
```
- **Purpose**: This selector checks if the user has the `MANAGER` role.
- **Parameters**:
  - **First Argument**: `getUserRoles` selector, which provides the user's roles array.
  - **Second Argument**: A function that checks if the `MANAGER` role is present in the roles array and returns a boolean value.
- **Returns**: `true` if the user has the `MANAGER` role; otherwise, `false`.
- **Usage**: Use this selector when you need to determine if the user has managerial privileges.
  It helps in conditionally rendering admin-specific components or features, and in implementing role-based access control within the application.






## Usage Examples 
## Example 1: `useUserRoles` in Component
```typescript jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useUserRoles, UserRole } from '@/entities/User';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const location = useLocation();
  const userRoles = useUserRoles();

  const hasRequiredRoles = roles ? roles.some(role => userRoles?.includes(role)) : true;

  if (!userRoles) {
    return <Navigate to="/main" state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
}
```

## Example 2: `isUserManager` and `isUserAdmin` in Component
```typescript jsx
import { useSelector } from 'react-redux';
import { isUserAdmin, isUserManager } from '@/entities/User';

const Dashboard = () => {
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  return (
          <div>
            {isAdmin && <div>Admin Panel</div>}
            {isManager && <div> Manager Panel</div>}
            {/* Your content here */}
          </div>
  );
};
```


## Conclusion 
- `getUserRoles`: Retrieves the array of roles assigned to the user from the Redux state.
- `useUserRoles`: A custom hook that provides the user's roles array directly within React components.
- `isUserAdmin`: Determines if the user has the `ADMIN` role.
- `isUserManager`: Determines if the user has the `MANAGER` role.

These utilities help in managing role-based access control, allowing you to conditionally render components or redirect users based on their roles and authentication status.
