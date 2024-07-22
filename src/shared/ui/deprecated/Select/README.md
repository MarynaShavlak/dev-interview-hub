# Select (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Select` component is a customizable and flexible dropdown menu designed for a wide range of applications in a React project. It allows developers to implement various options for selection, making it an essential component for creating interactive and consistent user interfaces.

## Type Definitions
The types used in the `Select` component are defined as follows:
```typescript
export interface SelectOption<T extends string> {
    value: T;
    content: string;
    readonly?: boolean;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}
```

## Props
The `Select` component accepts the following props:

| Prop         | Type                                    |    Required / Optional    | Description                                                                            |
|--------------|-----------------------------------------|:-------------------------:|----------------------------------------------------------------------------------------|
| `options`    | `SelectOption<T>[]`                     |          Required         | An array of options to be displayed in the dropdown, each with a `value` and `content`. |
| `className`  | `string`                                |          Optional         | Additional custom class names to style the select component.                           |
| `label`      | `string`                                |          Optional         | The label to be displayed above the select dropdown.                                    |
| `value`      | `T`                                     |          Optional         | The currently selected value.                                                          |
| `onChange`   | `(value: T) => void`                    |          Optional         | Callback function to handle the change event when a different option is selected.      |
| `readonly`   | `boolean`                               |          Optional         | If `true`, the select dropdown will be disabled and non-interactive.                   |

## Usage Examples
```typescript jsx
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';

export const BasicSelectExample = () => {
    const options: SelectOption<string>[] = [
        { value: 'option1', content: 'Option 1' },
        { value: 'option2', content: 'Option 2' },
        { value: 'option3', content: 'Option 3' },
    ];

    const handleChange = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <Select
            label="Choose an option"
            options={options}
            onChange={handleChange}
        />
    );
};
```
## Conclusion
The `Select` component is a versatile and powerful element designed to fit various use cases within React applications. Its extensive range of customization options—including multiple options, optional labels, and callback handling—allows developers to create dropdown menus that are both visually appealing and functionally effective. The ability to control the select's state and appearance ensures that it can be adapted to different design requirements and user interactions.
