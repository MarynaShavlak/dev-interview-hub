# AppLoader

## Overview 
The `AppLoader` component is designed to provide a visual loading state for an application while user data is being fetched or initialized. It uses feature toggles to conditionally apply different styles or layouts based on feature flags, ensuring that the user experience remains consistent regardless of the application's feature set.

The component conditionally renders either an `AppLoaderLayout` or a `PageLoader` based on the value of the `isAppRedesigned` feature flag. This approach allows for flexibility in the user interface, providing either a redesigned layout or a simpler loading indicator based on the current application features.


## Props
The AppLoader does not have any props, as the component's functionality is driven by internal feature toggles and theme management.

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
The `AppLoader` component enhances user experience during loading states by utilizing feature toggles to adapt its layout and appearance. By conditionally rendering either the `AppLoaderLayout` or `PageLoader`, it ensures that users receive a visually coherent experience while data is being fetched. This flexibility supports varying feature sets and user interface designs, making the component a versatile choice for handling loading states in modern applications.
