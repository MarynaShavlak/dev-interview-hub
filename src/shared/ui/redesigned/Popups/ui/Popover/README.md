# Popover Component 
## Overview
The `Popover` component is a flexible and highly customizable UI element designed to display content in a floating panel. It integrates with the **[Headless UI](https://headlessui.com/)** library to provide an accessible and interactive way to present additional information or actions triggered by a button or other elements. The `Popover` component is ideal for creating dropdowns, tooltips, and contextual menus, offering versatile placement options and a seamless user experience.

## Type Definitions
The types used in the `Popover` component are defined as follows:
```typescript
export type DropdownDirection = 'top left' | 'top right' | 'bottom left' | 'bottom right' | 'left' | 'right';
```
## Props
The `Popover` component accepts the following props:

| Prop      | Type                                        |          Required / Optional          | Description                                                     |
|-----------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------|
| `trigger` | `ReactNode`                                 |               Required                | The element that activates the popover when interacted with.    |
| `children`   | `ReactNode`                                 |               Optional                | The content to be displayed inside the popover panel.           |
| `direction`    | `DropdownDirection` | Optional <br/> (default: `'bottom right'`) | Determines the position of the popover relative to the trigger. |
| `className`  | `string`                                    |               Optional                | Additional custom class names to style the popover.             |

## Usage Examples
### Example 1: Basic Popover with Trigger
```jsx
import { Popover } from '@/shared/ui/redesigned/Popover';

export const BasicPopoverExample = () => {
    return (
        <Popover
            trigger={<button>Open Popover</button>}
        >
            <div>This is the popover content!</div>
        </Popover>
    );
};
```
### Example 1: Popover with Custom Direction
```jsx
import { Popover } from '@/shared/ui/redesigned/Popover';

export const PopoverWithCustomDirection = () => {
    return (
        <Popover
            direction="top right"
            trigger={<button>Hover me</button>}
        >
            <div>Popover content appears at the top right!</div>
        </Popover>
    );
};
```

## Conclusion
The `Popover` component is a powerful tool for displaying floating content in a React application. Its integration with **[Headless UI](https://headlessui.com/)** ensures accessibility and ease of use, while its customizable options for direction, trigger elements, and content make it versatile for a wide range of use cases. By allowing developers to style the popover and control its positioning, the `Popover` component provides a flexible and interactive solution for enhancing user interfaces.
