# AppRouter Component Documentation

## Overview
The **'AppRouter'** component is responsible for setting up the application's routing structure using **'react-router-dom'**. It defines and configures the routes based on the provided configuration, handling both public and protected routes. The component ensures that appropriate elements are displayed for each route and manages loading states with a suspense fallback.

## Dependencies
- **'React'**: For creating components and hooks.
- **'react-router-dom'**: For handling routing in the application.
- **'PageLoader'**: A loading component displayed during lazy loading of route components.
- **'RequireAuth'**: A higher-order component that protects routes requiring authentication.
- **'routeConfig'**: Configuration object containing route definitions and properties.

## Component Code
```javascript
import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps } from '@/shared/types/router';
import { routeConfig } from '../config/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
```

## Props
The **'AppRouter'** component does not accept any props.

## Description 

## **Function 'renderWithWrapper'** 

This function takes a route configuration object of type **_'AppRoutesProps'_** as an argument and returns a **'Route'** component with the following characteristics:

- **Lazy Loading**: The route's component is wrapped in a **'Suspense'** component with **'PageLoader'** as the fallback to handle lazy loading.
- **Authentication Handling**: If the route requires authentication (**'authOnly'**), it wraps the component in a **'RequireAuth'** component that checks user roles.

## Route Rendering
The **'AppRouter'** uses the **'Routes'** component from **_'react-router-dom'_** to render all routes defined in **"routeConfig'**. 

Each route configuration is processed by **'renderWithWrapper'**, ensuring that routes are wrapped with appropriate logic for loading and authentication.


## Notes
- Ensure **'AppRouter'** is wrapped in a **'Suspense'** component to handle lazy loading correctly.
- Routes requiring authentication are protected using **'RequireAuth'**.
- The **_'memo'_** HOC is used to optimize performance by preventing unnecessary re-renders.
