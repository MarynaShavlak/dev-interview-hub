# ListBox (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `ListBox` component is a versatile dropdown selector designed for React applications. It provides a customizable way to display and select options from a list, leveraging the **[Headless UI](https://headlessui.com/)** library for accessibility and functionality. The `ListBox` component supports various configurations, including direction, read-only states, and custom styles, making it an essential tool for creating intuitive selection interfaces.

## Type Definitions
The types used in the `ListBox` component are defined as follows:

```typescript
type DropdownDirection = 'top left' | 'top right' | 'bottom left' | 'bottom right';

interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
```
## Props 
The `ListBox` component accepts the following props:

| Prop          | Type                      | Required / Optional                  | Description                                                                                   |
|---------------|---------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------|
| `items`        | `ListBoxItem<T>[]`        | Required                             | An array of items to display in the dropdown. Each item should include a `value` and `content`. |
| `onChange`     | `(value: T) => void`      | Required                             | Callback function triggered when an item is selected.                                         |
| `value`        | `T`                       | Optional                             | The currently selected value.                                                                 |
| `defaultValue` | `string`                  | Optional                             | The default value to display when no value is selected.                                       |
| `readonly`     | `boolean`                 | Optional                             | If `true`, the dropdown will be read-only and not interactable.                               |
| `direction`    | `DropdownDirection`       | Optional (default: `'bottom right'`) | Determines the direction in which the listbox will open.                                     |
| `label`        | `string`                  | Optional                             | An optional label to display before the listbox.                                             |
| `className`    | `string`                  | Optional                             | Additional custom class names to style the dropdown.                                          |


## Usage Example
```typescript jsx
import { Listbox } from '@/shared/ui/Listbox/Listbox';
import { ListBoxItem } from './OptionItem/OptionItem';

const items: ListBoxItem<string>[] = [
    { value: 'option1', content: 'Option 1' },
    { value: 'option2', content: 'Option 2' },
    { value: 'option3', content: 'Option 3' },
];

export const ListboxWithCustomDirection = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>('option1');

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <Listbox
            items={items}
            value={selectedValue}
            onChange={handleChange}
            direction="top right"
            label="Custom Direction Listbox"
        />
    );
};
```

## Conclusion
The `ListBox` component is a robust and adaptable dropdown selector designed to fit various selection needs within React applications. Its support for multiple directions, read-only states, and custom styles makes it a powerful tool for creating user-friendly and accessible dropdown menus. With its dynamic options and flexible configuration, the `ListBox` component is essential for building effective and interactive selection interfaces.
