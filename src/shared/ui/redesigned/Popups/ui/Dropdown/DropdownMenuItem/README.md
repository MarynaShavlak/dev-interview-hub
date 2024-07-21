# DropdownMenuItem
## Overview
The `DropdownMenuItem` component is a flexible and interactive item designed to be used within dropdown menus in a React project. It allows developers to easily implement menu items that can be either clickable buttons or navigational links, making it an essential component for creating dynamic and user-friendly dropdown interfaces.

## Type Definitions
The types used in the `DropdownMenuItem` component are defined as follows:
```typescript
export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}
```
## Props 
The DropdownMenuItem component accepts the required props `item` of type `DropdownItem`.


| Prop   | Type             | Required / Optional | Description                                                                                  |
|--------|------------------|---------------------|----------------------------------------------------------------------------------------------|
| `item` | `DropdownItem`   |        Required     | An object containing the item's properties and behavior.                                     |
| `item.disabled` | `boolean`    |      Optional       | If `true`, the menu item will be disabled and non-interactive.                              |
| `item.content`  | `ReactNode`  |      Optional       | The content to be displayed inside the menu item.                                            |
| `item.onClick`  | `() => void` |      Optional       | A callback function to be executed when the menu item is clicked.                            |
| `item.href`     | `string`     |      Optional       | A URL that the menu item will navigate to when clicked. If provided, the item will be a link.|

## Features
1. **Interactive Menu Items**: The **`DropdownMenuItem`** component allows for the creation of both clickable buttons and navigational links, depending on the presence of the `href` property.

2. **Disabled State**: Use the `disabled` property to make the menu item non-interactive, useful for disabling actions or links conditionally.

3. **Content Customization**: Utilize the `content` property to include any content inside the menu item, from simple text to complex HTML structures.

4. **Conditional Classes**: The component uses the `classNames` helper function to conditionally apply CSS classes, including an active state class for interactive feedback.

5. **Headless UI Integration**: This component leverages **Headless UI**'s **`Menu.Item`** to manage dropdown item behavior and interactions, providing a robust and accessible foundation for dropdown menus.

## Usage Examples
### Example 1: Basic Dropdown Menu Item
```jsx
import { DropdownMenuItem, DropdownItem } from '@/shared/ui/DropdownMenuItem';

const item: DropdownItem = {
    content: 'Click Me',
    onClick: () => alert('Item clicked!'),
};

export const BasicDropdownItemExample = () => {
    return (
        <DropdownMenuItem item={item} />
    );
};
```

### Example 1: Dropdown Menu Item with Link
```jsx
import { DropdownMenuItem, DropdownItem } from '@/shared/ui/DropdownMenuItem';

const item: DropdownItem = {
    content: 'Go to Page',
    href: '/some-page',
};

export const DropdownItemWithLinkExample = () => {
    return (
        <DropdownMenuItem item={item} />
    );
};
```

## Conclusion
The `DropdownMenuItem` component is a versatile and powerful element designed to fit various use cases within dropdown menus in React applications. Its ability to function as either a button or a link, along with its support for disabled states and customizable content, ensures that it can be adapted to different design requirements and user interactions. With conditional class management and interactive feedback, the `DropdownMenuItem` component is an essential tool for building dynamic and user-friendly dropdown interfaces, leveraging the accessibility and functionality provided by **[Headless UI](https://headlessui.com/)**.
