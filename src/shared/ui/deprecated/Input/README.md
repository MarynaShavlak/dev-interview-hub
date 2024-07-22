# Input (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview 
The `Input` component is a versatile and customizable form input element designed to handle various user input scenarios in React applications. It provides support for autofocus, read-only mode, digit-only inputs, and a visual caret indicator for focused states, making it a valuable component for creating flexible and interactive user interfaces.

## Type Definitions
The types used in the `Input` component are defined as follows:
```typescript
type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' 
    >;
```

## Props
The `Input` component extends `InputHTMLAttributes<HTMLInputElement>`, but it uses TypeScript's `Omit` utility type to exclude certain attributes, such as: `value`, `onChange`, `readonly`.
These attributes are handled separately by the Input component's own props, avoiding potential conflicts or redundancy.
The `Input` accepts the following props:

| Prop         | Type                                    |          Required / Optional          | Description                                                    |
|--------------|-----------------------------------------|:-------------------------------------:|----------------------------------------------------------------|
| `className`  | `string`                                |               Optional                | Additional custom class names to style the input.              |
| `value`      | `string` or  `number`                   |               Optional                | The current value of the input field.                          |
| `onChange`   | `(value: string) => void`               |               Optional                | Callback function triggered when the input value changes.      |
| `autofocus`  | `boolean`                               |               Optional                | If `true`, the input field will automatically focus on render. |
| `readonly`   | `boolean`                               |               Optional                | If `true`, the input field will be read-only and non-editable. |
| `digitsOnly` | `boolean`                               |               Optional                | If `true`, the input field will only accept numeric values.    |
| `otherProps` | `InputHTMLAttributes<HTMLInputElement>` |               Optional                | Any additional input HTML attributes.                          |


## Features
1.  **Additional Content**: Use the `addonLeft` and `addonRight` props to add content, such as icons, to the left and right sides of the input field, enhancing its functionality and visual appeal.
2.  **Read-Only Mode**: The `readonly` prop makes the input field non-editable, useful for displaying information that users should not modify.
3.  **Digit-Only Input**: The `digitsOnly` prop restricts the input to numeric values only, useful for inputs like phone numbers or amounts.
4.  **Caret Indicator**: Displays a visual caret indicator when the input field is focused and not in read-only mode, enhancing the user experience by showing the current cursor position.
## Ref Forwarding
The `Input` component uses `forwardRef` to enable ref forwarding. This allows the component to pass a ref to its underlying HTML input element, which is particularly useful for integrating with external libraries or handling programmatic focus and interactions.


## Usage Examples

### Example 1: Basic Input with autofocus
```typescript jsx
import { Input } from '@/shared/ui/redesigned/Input';

export const BasicInputExample = () => {
    return (
        <Input placeholder="Enter text here" autofocus />
    );
};
```
### Example 2: Input with Label and Addon
```typescript jsx
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';

export const InputWithLabelAndAddonExample = () => {
    return (
        <Input
            addonLeft={<Icon width="16" height="16" Svg={SearchIcon} />}
            placeholder="Search"
            label="Name"
        />
    );
};
```

## Conclusion
The `Input` component is a flexible and customizable element designed to handle various user input scenarios within React applications. Its support for autofocus, read-only mode, digit-only inputs, and a visual caret indicator allows it to adapt to various design and functional requirements. Whether used for simple text input or complex forms, the Input component provides a robust solution for managing user input in a React-based interface.
