# withThemeProvider Component

## Overview
The `withThemeProvider` higher-order component (HOC) enhances any React component by wrapping it with a `ThemeProvider`, facilitating centralized theme management. It leverages user-defined theme settings to ensure consistent theme application throughout the application.

## Role and Purpose:
This component plays a pivotal role in integrating the `ThemeProvider` functionality into existing React components. By encapsulating components within a theme context, it enables seamless theme customization and persistence across sessions.

## Details of Implementation:

- **Props**

| Prop       | Type                   | Required / Optional | Description                                                                 |
|------------|------------------------|---------------------|-----------------------------------------------------------------------------|
| `Component`| `React.ComponentType`  | Required            | The component to be enhanced with theme-providing capabilities.              |

- **Functionality**

The `withThemeProvider` HOC enriches `Component` by embedding it within a `ThemeProvider`. It retrieves the default theme using `useJsonSettings` and applies it globally across the application. This ensures that the wrapped component seamlessly integrates with the current theme settings.

## Usage Example:
```typescript jsx
import React, { useEffect } from 'react';
import { initAuthData, useUserInited } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLoader } from './components/AppLoader/AppLoader';
import { AppContent } from './components/AppContent/AppContent';
import { withThemeProvider } from './providers/ThemeProvider/ui/withThemeProvider/withThemeProvider';

function App() {
    const inited = useUserInited();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    return !inited ? <AppLoader /> : <AppContent />;
}

export default withThemeProvider(App);
```

## Conclusion
The `withThemeProvider` HOC is a robust solution for injecting centralized theme management into any React component. By abstracting the theme handling logic, it allows developers to focus on building feature-rich components while ensuring consistent theming across the application. This approach promotes scalability and maintainability, making it easier to manage user preferences and enhance the overall user experience. Integrating `withThemeProvider` into your React architecture is a best practice for applications that require dynamic and persistent theming capabilities.

