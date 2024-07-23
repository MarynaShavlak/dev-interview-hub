# AppRouter 

## Overview
The `AppRouter` component is responsible for setting up the application's routing structure using `react-router-dom`. 
It defines and configures the routes based on the provided configuration, handling both public and protected routes. 
The component ensures that appropriate elements are displayed for each route and manages loading states with a suspense fallback, enhancing the user experience during route transitions.


## Props
The `AppRouter` component does not accept any props, as it relies on the internal `routeConfig` for route definitions and properties.

## Description 
Supports feature toggling to conditionally apply different styles or behaviors based on feature flags.

## **Function 'renderWithWrapper` 

This function takes a route configuration object of type `AppRoutesProps` as an argument and returns a `Route` component with the following characteristics:

- **Lazy Loading**: The route's component is wrapped in a `Suspense` component with `PageLoader` or a custom skeleton as the fallback to handle lazy loading.
- **Authentication Handling**: If the route requires authentication (`authOnly`), it wraps the component in a `RequireAuth` component that checks user roles.


## Route Rendering
The `AppRouter` uses the `Routes` component from `react-router-dom` to render all routes defined in `routeConfig`. 
Each route configuration is processed by `renderWithWrapper`, ensuring that routes are wrapped with appropriate logic for loading and authentication.

## Usage Example
```typescript jsx
import React, { Suspense } from 'react';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from '../../lib/useAppToolbar/useAppToolbar';
import { AppRouter } from '../../providers/router';

export const AppContent = () => {
    const { theme } = useTheme();
    const toolbar = useAppToolbar();

    return (
        <div id="app" >
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
};
```

## Conclusion
The `AppRouter` component provides a robust and flexible routing solution for the application.
By leveraging lazy loading, authentication checks, and feature toggles, it ensures a seamless and secure user experience. 
The use of `Suspense` for handling loading states and `memo` for optimizing performance further enhances its efficiency and responsiveness, making it an essential component for managing application routes.
