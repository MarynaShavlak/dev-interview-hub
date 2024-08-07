# AuthorizedNavbar

## Overview
The `AuthorizedNavbar` component provides a navigation bar for authenticated users, featuring different styles based on the application's design configuration. It conditionally renders either the redesigned or deprecated navbar layout depending on the `isAppRedesigned` feature flag. The component includes essential navigation elements such as a link to create articles, notifications, and an avatar dropdown for user actions.

## Type Definition
```typescript
interface NavbarProps {
    className?: string;
}
```

## Props
The **`AuthorizedNavbar`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features
1. **Feature Flag Driven**: Utilizes the `ToggleFeaturesComponent` to render either the redesigned or deprecated navbar layout based on the `isAppRedesigned` feature flag. This ensures that the component aligns with the overall design system of the application.
2. **Navigation Elements**: Includes a link to create new articles (`AppLink`), a notifications button (`NotificationButton`), and an avatar dropdown (`AvatarDropdown`), enhancing user interaction and navigation.
3. **Responsive Design**: The component adapts its appearance dynamically to fit the design specifications defined by the feature flags, ensuring a consistent look and feel across different application states.


## Usage Example
```typescript jsx
import React, { memo } from 'react';
import { useUserAuthData } from '@/entities/User';
import { AuthorizedNavbar } from './AuthorizedNavbar/AuthorizedNavbar';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useUserAuthData();

    if (authData) {
        return <AuthorizedNavbar className={className} />;
    }

});
```
## Conclusion
The `AuthorizedNavbar` component is a key part of the application's navigation system for authenticated users. By leveraging feature flags, it dynamically adapts its layout between redesigned and deprecated styles, ensuring consistency with the overall design system. With its integrated navigation elements, including article creation, notifications, and user interactions, it enhances the user experience and supports efficient navigation throughout the application.
