# NotAuthorizedNavbar

## Overview
The `NotAuthorizedNavbar` component provides a navigation bar for users who are not authenticated. 
It displays a login button and, if the login modal is active, renders the `LoginModal` component. 
This component adapts its appearance based on the application's feature flags, switching between redesigned and deprecated styles as necessary. 
It ensures that unauthenticated users have easy access to the login functionality and maintains a consistent user experience across different design versions of the application.

## Type Definition
```typescript
interface NavbarProps {
    className?: string;
}
```

## Props
The **`NotAuthorizedNavbar`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features
1. **Feature Flag Driven**: Utilizes the `toggleFeatures` utility to switch between the redesigned and deprecated button styles based on the isAppRedesigned feature flag. This ensures that the navbar's appearance aligns with the overall design system of the application.
2. **Login Modal Integration**: Manages the visibility of the `LoginModal` based on the authentication state, providing a seamless login experience.
3. **Responsive Design**: The component adapts its appearance dynamically to fit the design specifications defined by the feature flags, ensuring a consistent look and feel across different application states.


## Usage Example
```typescript jsx
import React, { memo } from 'react';
import { useUserAuthData } from '@/entities/User';
import { NotAuthorizedNavbar } from './NotAuthorizedNavbar/NotAuthorizedNavbar';
import { AuthorizedNavbar } from './AuthorizedNavbar/AuthorizedNavbar';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useUserAuthData();

    if (authData) {
        return <AuthorizedNavbar className={className} />;
    }

    return <NotAuthorizedNavbar className={className} />;
});
```
## Conclusion
The `NotAuthorizedNavbar` component is a crucial part of the application's navigation system for unauthenticated users. By leveraging feature flags, it adapts its appearance between redesigned and deprecated styles, maintaining a consistent user experience. Its integration with the login modal ensures that users can easily access authentication functionality, while its responsive design accommodates various application states
