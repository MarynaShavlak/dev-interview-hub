# PageLoader Widget

## Overview 
The `PageLoader` widget is a specialized component designed to display a loading spinner, indicating to users that a page or a section of the application is currently loading. This component is essential for providing visual feedback during asynchronous data fetching or heavy processing tasks, enhancing the overall user experience by reducing perceived wait times and improving interface responsiveness.

##  Type Definition
```typescript
interface PageLoaderProps {
    className?: string;
}
```

## Props
The `PageLoader` has the following props:

| Prop         | Type                                        |          Required / Optional          | Description                                                                 |
|--------------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `className`  | `string`                                    |               Optional                | Additional CSS class names to apply to the main container for custom styling.                       |


## Features
1. **Loading Indicator**: The `PageLoader` component uses the `Loader` component to display a loading spinner. This visual indicator is essential for informing users that a loading process is underway
2. **Infinite Scrolling**: The `PageLoader` utilizes the `VStack` component from the  Stack UI to center the loading spinner both horizontally and vertically within its container.
3.  **Feature Toggling and CSS Classes**: The component supports feature toggling to apply different styles based on the feature flag `isAppRedesigned`. Conditional class names are applied according to the feature toggle and any additional class names passed via props. This ensures that the component adapts its styling based on the current feature flag and any custom styling requirements.

## Usage Examples

```typescript jsx
import React from 'react';
import { PageLoader } from '@/widgets/PageLoader';

const LoadingPage = () => {
    return (
        <div>
            <PageLoader />
        </div>
    );
};

export default LoadingPage;
```

## Conclusion 
The `PageLoader` widget provides a simple yet effective way to indicate loading states within an application. By leveraging the Loader component and the VStack layout, it ensures a user-friendly experience during asynchronous operations.
