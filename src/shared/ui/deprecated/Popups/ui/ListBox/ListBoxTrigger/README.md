# ListBoxTrigger (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory. 

## Overview

The `ListBoxTrigger` component serves as a button that displays the currently selected item from a listbox. When clicked, it reveals the listbox interface, allowing users to choose a different option. This component integrates with the **[Headless UI](https://headlessui.com/)** library to manage listbox interactions and provides visual feedback for the selected item.

## Type Definition
```typescript
interface ListBoxTriggerProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
}
```

## Props
The `ListBoxTrigger` component accepts the following props:

| Prop             | Type                          | Required / Optional | Description                                                   |
|------------------|-------------------------------|----------------------|---------------------------------------------------------------|
| `selectedItem`   | `ListBoxItem<T>` or `undefined` | Required             | The currently selected item, or `undefined` if no item is selected. |
| `defaultValue`   | `string`                      | Optional             | The default value to display when no item is selected.       |
| `readonly`       | `boolean`                     | Optional             | If true, the button is disabled and cannot be interacted with. |

## Usage Example 
```typescript jsx
import { ListBoxTrigger } from './ListBoxTrigger';
import { ListBoxItem } from '../Option/Option';
import { useState } from 'react';

const items: ListBoxItem<string>[] = [
    { value: 'option1', content: 'Option 1' },
    { value: 'option2', content: 'Option 2' },
    { value: 'option3', content: 'Option 3' },
];

export const ExampleUsage = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>('option1');
    const selectedItem = items.find(item => item.value === selectedValue);

    return (
        <ListBoxTrigger
            selectedItem={selectedItem}
            defaultValue="Select an option"
            readonly={false}
        />
    );
};
```

## Conclusion 
The `ListBoxTrigger` component provides a user-friendly way to display the selected item from a listbox. It functions as a button that triggers the listbox interface when clicked, and it supports a default display value and a disabled state. By integrating with **[Headless UI](https://headlessui.com/)**, this component ensures accessibility and a smooth user experience within selection interfaces.
