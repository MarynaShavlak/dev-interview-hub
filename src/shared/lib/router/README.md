# useRouteChange  hook
The `useRouteChange` hook is designed to monitor the current URL path and determine the corresponding application route. 
This hook is particularly useful in applications where certain components or functionality need to be conditionally rendered based on the current rou

## Parameters
This hook does not accept any parameters directly. 
It relies on the `useLocation` hook from `react-router-dom` to obtain the current URL path and the `AppRouteByPathPattern` constant to map the path to an application route.

## Returns
`appRoute`: The current application route, derived from the URL path. The type of this value is `AppRoutes`, which is an enum representing the possible routes in the application.


## Internal Behavior
1. **useLocation**:
    - The hook uses `useLocation` from `react-router-dom` to access the current location object, which includes information about the current URL.
   
2. **State Management**:
    - **`appRoute`**: The state is initialized with a default value of `AppRoutes.MAIN`.

3. Effects:
    - **`useEffect`** runs whenever the `location.pathname` changes. 
      - It iterates over the `AppRouteByPathPattern` entries to find a matching route pattern using `matchPath`. 
      - When a match is found, it updates the `appRoute` state with the corresponding route.

## Usage Example 

In this example, `MyComponent` uses the `useRouteChange` hook to determine the current route and conditionally render components based on the value of `currentRoute`. 
This allows for dynamic and responsive UI updates based on the active route.
```typescript jsx
import React from 'react';
import { useRouteChange } from '@/shared/lob/router/useRouteChange';
import { AppRoutes } from '@/shared/const/router';

const MyComponent = () => {
    const currentRoute = useRouteChange();

    return (
        <div>
            {currentRoute === AppRoutes.MAIN && <MainComponent />}
            {currentRoute === AppRoutes.ANOTHER_ROUTE && <AnotherComponent />}
            {/* Add more conditional renders based on routes */}
        </div>
    );
};

export default MyComponent;

```
## Conclusion
The `useRouteChange` hook streamlines the process of monitoring and responding to changes in the application's route. 
By providing the current route based on the URL path, it enables conditional rendering and dynamic updates of UI components based on route changes. 
This hook is especially beneficial in applications with multiple routes where components need to adapt or change according to the active route, enhancing the overall user experience and maintaining a clean and organized codebase.
