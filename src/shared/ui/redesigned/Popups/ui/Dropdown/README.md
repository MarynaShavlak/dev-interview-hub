# Dropdown
## Overview
The `Dropdown` component provides a flexible and interactive dropdown menu solution for React projects. It allows developers to create dropdowns with customizable triggers and menu items, leveraging **[Headless UI](https://headlessui.com/)** for accessible and robust menu functionality.

## Type Definitions
The types used in the `Dropdown` component are defined as follows:
```typescript
import { DropdownItemProps } from './DropdownItem/DropdownItem';
import { DropdownDirection } from '@/shared/types/ui';

export interface DropdownProps {
    items: DropdownItemProps[];
    trigger: ReactNode;
    direction?: DropdownDirection;
    className?: string;
}
```

## Props
The **`Dropdown`** component accepts the following props:

| Prop       | Type                   | Required / Optional | Description                                                                                                   |
|------------|------------------------|---------------------|---------------------------------------------------------------------------------------------------------------|
| `items`    | `DropdownItemProps[]` | Required            | An array of objects containing the properties and behavior for each dropdown item.                           |
| `trigger`  | `ReactNode`            | Required            | The element that triggers the dropdown menu when clicked.                                                   |
| `direction`| `DropdownDirection`    | Optional (default: `'bottom right'`) | Determines the direction of the dropdown menu. Available options include `bottom right`, `bottom left`, `top right`, `top left`. |
| `className` | `string`               | Optional            | Additional custom class names to style the dropdown.                                                        |

## Usage Example
```jsx
import { Dropdown } from '@/shared/ui/Dropdown';
import { DropdownItemProps } from '@/shared/ui/DropdownItem/DropdownItem';

const items: DropdownItemProps[] = [
    { content: 'Item 1', onClick: () => alert('Item 1 clicked!') },
    { content: 'Item 2', href: '/page2' },
];

export const DropdownWithDirectionExample = () => {
    return (
        <Dropdown
            trigger={<button>Open Dropdown</button>}
            items={items}
            direction="top left"
        />
    );
};
```

## Conclusion
The `Dropdown` component is a versatile and powerful solution for implementing dropdown menus in React applications. Its support for customizable triggers, dynamic menu items, and direction control, combined with integration with **[Headless UI](https://headlessui.com/)**, ensures that it meets various design and functionality needs. Whether you need a simple dropdown or a more complex menu, the `Dropdown` component provides a robust and accessible foundation for building interactive user interfaces.
