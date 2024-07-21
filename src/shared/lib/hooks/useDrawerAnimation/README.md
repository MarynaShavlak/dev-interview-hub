# useDrawerAnimation hook
A custom React hook designed to manage the animation state and behavior of a drawer component. It utilizes animation libraries (**[Spring](https://www.react-spring.dev/)** and **[Gesture](https://use-gesture.netlify.app/)**) for smooth transitions and gesture handling to control the drawer's open and close actions.

## Parameters
- `isOpen`: _Required_. A boolean indicating whether the drawer is currently open.
- `height`: _Required_. The height of the drawer in pixels.
- `onClose`: _Optional_.  An optional callback function invoked when the drawer is closed.


## Returns
An object with the following properties and methods:
- `style`: An object containing the style properties to be applied to the drawer.
- `onCloseHandler`: A function to animate closing the drawer with optional velocity control.
- `onDragHandler`: A gesture handler for dragging the drawer, controlling its position based on user interaction.

## Internal Behavior
1. **Animation Setup**:
    - **Spring Animation**: Manages the vertical position (`y`) of the drawer using an animation library (`Spring`).

2. **Open and Close Logic**:
    - **`openDrawer`**: Animates the drawer to open when `isOpen` is `true`.
    - **`onCloseHandler`**: Animates the drawer to close when called, optionally with velocity control. Calls `onClose` callback upon completion.

3. **Drag Gesture Handling**:
    - **`onDragHandler`**: Handles user drag interactions on the drawer. Allows smooth dragging within bounds, with rubberband effect and tap filtering.

4. **Dependencies**:
    - Uses `useEffect` to trigger opening animation when `isOpen` changes.

## Usage Example
```jsx
import React, { useState } from 'react';
import { useDrawerAnimation } from '@/shared/lib/hooks/useDrawerAnimation';

const DrawerComponent = ({ isOpen, onClose }) => {
    const { style,  onCloseHandler, onDragHandler } = useDrawerAnimation({
        isOpen,
        height: 300,
        onClose,
    });

    return (
        <div
            style={style}
        >
           {...onDragHandler()}
            {/* Drawer content and controls */}
        </div>
    );
};

export default DrawerComponent;
```

## Conclusion
The `useDrawerAnimation` hook provides a flexible solution for managing the animation and interaction of a drawer component in React applications. It integrates smoothly with animation libraries and supports both programmatic and gesture-based control of the drawer's opening and closing behavior.
