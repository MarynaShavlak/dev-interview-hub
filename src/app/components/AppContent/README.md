# AppContent

## Overview 
The `AppContent` component is designed to render the main layout of the application, adapting its structure based on feature flags. 
It utilizes a `ToggleFeaturesComponent` to conditionally render different layouts for a redesigned or deprecated app style. 
This ensures that the user interface remains flexible and consistent with the current application's feature set.

## Props
The `AppContent` does not have any props, , as the component's functionality is driven by internal feature toggles and theme management.

## Usage Example
```typescript jsx
import React from 'react';
import { AppLoader } from './components/AppLoader/AppLoader';
import { AppContent } from './components/AppLoader/AppContent';

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

export default App;

```

## Conclusion 
The `AppContent` component provides a dynamic and adaptable main layout for the application, leveraging feature toggles to switch between a redesigned layout and a classic layout.
By using a suspense fallback and integrating various components such as `Navbar`, `Sidebar`, and `AppRouter`, it ensures a cohesive and responsive user experience. This flexibility supports varying feature sets and user interface designs, making the component a versatile choice for rendering the main content of modern applications.
