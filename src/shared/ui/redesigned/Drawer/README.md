# Drawer

## Overview
The `Drawer` component is a versatile and customizable sliding panel designed to provide an interactive and smooth user experience in a React project. It allows developers to create off-canvas drawers that can be opened or closed with a sliding animation. This component is ideal for implementing side menus, additional content panels, or notifications in a user interface.

## Type Definitions
The types used in the `Drawer` component are defined as follows:

```typescript
interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    lazy?: boolean;
    className?: string;
}
```
## Props
The `Drawer` component accepts the following props:

| Prop       | Type                | Required / Optional | Description                                                                 |
|------------|---------------------|---------------------|-----------------------------------------------------------------------------|
| `children`  | `ReactNode`         | Required            | The content to be displayed inside the drawer.                              |
| `isOpen`    | `boolean`           | Required            | Controls whether the drawer is open or closed.                              |
| `onClose`   | `() => void`        | Optional            | Callback function to be called when the drawer should be closed.            |
| `lazy`      | `boolean`           | Optional            | If `true`, the drawer content will be rendered lazily, only when the drawer is opened. |
| `className` | `string`            | Optional            | Additional custom class names to style the drawer.                          |


## Features

1. **Smooth Sliding Animation**: Provides a smooth sliding animation effect, enhancing user interactions with the drawer.

2.  **Theming Support**: Integrates with theming to support different visual styles based on the application's theme, ensuring consistency.

3.  **Overlay Interaction**: Includes an overlay that dims the background and allows users to close the drawer by clicking outside the content area.

4.  **Conditional Rendering**: The `lazy` prop ensures that the drawer content is only rendered when needed, optimizing performance and resource usage.


## Usage Example
```jsx
import  { useState } from 'react';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const LazyDrawerExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Lazy Drawer</button>
            <Drawer isOpen={isOpen} onClose={handleClose} lazy>
                <div>Content loaded lazily</div>
            </Drawer>
        </>
    );
};
```

## Conclusion
The `Drawer` component offers a smooth, customizable sliding panel experience for React applications. Its support for theming, overlay interaction, and lazy rendering ensures a flexible and performant solution for off-canvas content. By integrating ref forwarding, the `Drawer` is adaptable to complex UI libraries, making it a valuable component for modern web interfaces.
