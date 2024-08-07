# Navbar Widget

## Overview
The `Navbar` component dynamically renders either the `AuthorizedNavbar` or the `NotAuthorizedNavbar` based on the user's authentication status. It leverages the `useUserAuthData` hook to determine whether the user is authenticated. If authentication data is present, the component renders the `AuthorizedNavbar`, providing authenticated users with additional navigation options. If no authentication data is available, the component renders the `NotAuthorizedNavbar`, which provides login functionality for unauthenticated users.

## Type Definition
```typescript
interface NavbarProps {
    className?: string;
}
```

## Props
The **`Navbar`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features
1. **Dynamic Rendering**: Conditionally renders the `AuthorizedNavbar` for authenticated users and the `NotAuthorizedNavbar` for unauthenticated users, based on the presence of user authentication data.
2. **Authentication Integration**: Uses the `useUserAuthData` hook to determine the authentication status and adapt the navigation options accordingly.
3. **Consistent Navigation**: Ensures that users have access to appropriate navigation options based on their authentication status, enhancing user experience and interactio

## Usage Example
```typescript jsx
import React, { memo } from 'react';
import { Navbar } from '@widgets/Navbar';

interface AppProps {
    className?: string;
}

const App = ({ className }: AppProps) => {
    return <Navbar className={className} />;
};
```
## Conclusion
The `Navbar` component plays a crucial role in providing a tailored navigation experience based on user authentication. By dynamically rendering either the `AuthorizedNavbar` or `NotAuthorizedNavbar`, it ensures that users receive appropriate navigation options and functionality. This component leverages user authentication data to seamlessly integrate with the overall application’s navigation system, enhancing both usability and user experience.
