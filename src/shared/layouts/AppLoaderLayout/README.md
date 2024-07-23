# AppLoaderLayout

## Overview 
The `AppLoaderLayout` component is designed to display a loading fallback layout while user data is being fetched or initialized. This layout uses skeleton screens to provide a placeholder for content, ensuring that users receive visual feedback during data loading periods. 
The `AppLoaderLayout` component is ideal for scenarios where an application requires a structured layout with placeholders for user interface elements, including headers, content areas, and sidebars.

##  Type Definition
```typescript
interface AppLoaderLayoutProps {
    className?: string;
}
```

## Props
The `AppLoaderLayoutProps` interface defines the following properties:

| Prop        | Type                                        |          Required / Optional          | Description                                                                |
|-------------|---------------------------------------------|:-------------------------------------:|----------------------------------------------------------------------------|
| `className` | `string`                                    |               Optional                | Additional CSS class names to apply to the component.|

## Usage Example
```typescript jsx
import { useEffect } from 'react';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

function App() {
    const inited = useUserInited();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <div id="app">
                <AppLoaderLayout />
            </div>
        );
    }

    return (
        <div id="app">
            <div>App Content</div>
        </div>
    );
}

export default App;
```

## Conclusion 
The `AppLoaderLayout` component provides a user-friendly loading experience by utilizing skeleton screens to represent content and layout structures while data is being fetched. 
It maintains a consistent visual structure with placeholders for header, content, and sidebar areas, ensuring that users receive feedback during data loading. 
By integrating this component, developers can enhance user experience with clear and informative loading states, thereby improving overall application usability.
