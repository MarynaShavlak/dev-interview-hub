# RequireAuth 

## Overview
The `RequireAuth ` component  ensures a user is authenticated and has the required roles to access a specific route. 
It uses the user's authentication status and roles to conditionally render children components or redirect to appropriate routes, providing a secure and role-based access control mechanism for the application.
This functionality enhances the user experience by redirecting unauthorized users to the main page and users without the necessary roles to the forbidden page, instead of showing a generic "page not found" error.

## Type Definition 
```typescript
interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}
```

## Props
The `RequireAuthProps` interface defines the following properties:


| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `children`  | `JSX.Element` | Required             | The child component that requires authentication and role validation.       |
| `isOpen`    | `UserRole[]`  | Optional             | An array of roles required to access the child component.       |


## Description 
The `RequireAuth` component uses the following logic to ensure proper authentication and role-based access:
1. **Authentication Check**: It checks if the user is authenticated using `useUserAuthData`.
2. **ole Validation**: It validates if the user has the required roles using `useUserRoles`. If no roles are specified, it grants access by default.
3. **Redirect Handling**:
   - If the user is not authenticated, it redirects to the main route (`getRouteMain`) and saves the current location to redirect back after successful login.
   - If the user lacks the required roles, it redirects to the forbidden route (`getRouteForbidden`) and saves the current location.

## Usage Example
```typescript jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/app/providers/router;
import { AdminPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { UserRole } from '@/entities/User';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                    path="/admin"
                    element={
                        <RequireAuth roles={[UserRole.ADMIN]}>
                            <AdminPage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
```

## Conclusion
The `RequireAuth` component is essential for implementing secure, role-based access control in a React application. 
By ensuring that only authenticated users with the necessary roles can access certain routes, it enhances the security and usability of the application. 
The use of hooks for authentication and role management, combined with conditional rendering and redirection, provides a robust and user-friendly solution for protecting routes.
Additionally, by redirecting unauthorized users to the main page and those without required roles to the forbidden page, it significantly improves the user experience and clarity of navigation.
