# useHover hook
The `useHover` hook is designed to manage and track the hover state of an element. It provides an easy way to detect when an element is hovered over and when the hover state is removed, which is useful for adding hover effects or handling interactions in a React application.

##  Problem Addressed
Managing hover states in React applications can be challenging, especially when dealing with multiple elements or complex hover logic. Without a dedicated mechanism, developers might encounter issues such as:

1. Managing hover state manually across multiple components.
2. Adding and removing event listeners directly in components, leading to code repetition.
3. Handling complex hover interactions in a clean and efficient manner.

## Solution
The `useHover` hook simplifies hover state management by providing:

1. A boolean value indicating whether the element is currently being hovered over.
2. Event handlers for `onMouseEnter` and `onMouseLeave` to manage the hover state.

## Parameters
The `useHover` hook does not accept any parameters.

## Returns
An object with the following properties:

| Property    | Type       | Description                                                      |
|-------------|--------------------------|------------------------------------------------------------------|
| `isHover` | `boolean`      | A boolean indicating whether the element is currently hovered over. |
| `bind ` | `UseHoverBind`      | An object containing `onMouseEnter` and `onMouseLeave` event handlers. These handlers should be attached to the element you want to track hover state for. |

## Internal Behavior
1. **State Management**:
   The hook uses the `useState` hook to maintain the hover state (`isHover`), which is updated based on mouse events.

2. **Event Handlers:**:
   The `onMouseEnter` and `onMouseLeave` handlers are defined using `useCallback` to ensure they do not change on each render. These handlers update the hover state when the mouse enters or leaves the element

## Usage Example 
### Example 1: Basic `useHover` Usage
This example demonstrates how to use the `useHover` custom hook to manage hover state for a button element, applying different styles based on whether the button is hovered.

```typescript jsx
import React from 'react';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';

export const HoverButton = () => {
   const [isHover, hoverBind] = useHover();

   return (
           <button
                   {...hoverBind}
                   style={{
                      backgroundColor: isHover ? 'lightblue' : 'gray',
                   }}
           >
              Hover me!
           </button>
   );
};
```

### Example 2: `useHover` in a Complex Component
This example shows how the `useHover` hook can be used within a more complex component to manage hover state and provide additional functionality.
```typescript jsx
import React, { useState, useCallback } from 'react';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';

export const HoverableCard = () => {
   const [isHover, hoverBind] = useHover();
   const [message, setMessage] = useState('');

   const handleHoverMessage = useCallback(() => {
      setMessage(isHover ? 'You are hovering!' : '');
   }, [isHover]);

   useEffect(() => {
      handleHoverMessage();
   }, [handleHoverMessage]);

   return (
           <div
                   {...hoverBind}
                   style={{
                      boxShadow: isHover ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                   }}
           >
              <p>{message}</p>
           </div>
   );
};
```
## Conclusion
The `useHover` hook simplifies the management of hover states in React applications. By providing an easy-to-use interface for tracking hover events, it enables developers to create interactive and visually engaging components with minimal boilerplate code. The hook enhances the user experience by allowing dynamic styling and behavior based on hover interactions.
