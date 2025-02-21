# Sidebar Widget

## Overview
The `Sidebar` component dynamically switches between the `SidebarRedesigned` and `SidebarDeprecated` based on the isAppRedesigned feature flag. This allows the application to provide either a modern or legacy sidebar interface, aligning with the current design system configuration. The component ensures that users interact with the appropriate version of the sidebar, enhancing their navigation experience according to the application's design preferences.

## Type Definition
```typescript
interface SidebarProps{
    className?: string;
}
```

## Props
The **`Sidebar`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features

1. **Feature Flag Driven**: Adapts between the `RedesignedSideba`r and `SidebarDeprecated` based on the isAppRedesigned feature flag, ensuring that the sidebar's appearance aligns with the application's design system.

## Usage Example
```typescript jsx
import React from 'react';
import { Sidebar } from '@widgets//Sidebar';

const App = () => {
    return (
        <div>
            <Sidebar className="custom-sidebar" />
            {/*  The Sidebar component adapts to the application's feature flag settings */}
        </div>
    );
};

```
## Conclusion
The `Sidebar` component is a versatile and dynamic navigation solution that adapts based on the application's design system. 
By leveraging the `isAppRedesigned` feature flag, it seamlessly transitions between the modern `SidebarRedesigned` and the legacy `SidebarDeprecated`, ensuring alignment with the current design preferences. 
Its collapsible functionality, dynamic content rendering, and integrated switchers (for theme and language) provide a user-friendly and adaptable sidebar experience. This component enhances navigation by offering a consistent and optimized interface tailored to the application’s design, improving overall user interaction and satisfaction.
