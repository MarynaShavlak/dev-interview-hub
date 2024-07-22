# Option (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Option` component is a customizable item element used within a listbox interface. It integrates with the **[Headless UI](https://headlessui.com/)** library, specifically with the `Listbox` component, to provide interactive and accessible dropdown options. The `Option` component supports dynamic styling based on its state (active, selected, disabled), making it a versatile choice for enhancing user interaction in selection interfaces.

## Type Definitions

The types used in the `Option` component are defined as follows:
```typescript
interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface OptionItemProps<T extends string> {
    item: ListBoxItem<T>;
}
```

## Props 
The `Option` component accepts the following props:

### Props

| Prop  | Type               | Required / Optional | Description                                                |
|-------|--------------------|----------------------|------------------------------------------------------------|
| `item` | `ListBoxItem<T>`   | Required             | The item object to be rendered. It includes:              |
|       |                    |                      | - `value` (string): The unique identifier for the item.   |
|       |                    |                      | - `content` (ReactNode): The content to be displayed for the item. |
|       |                    |                      | - `disabled` (boolean, optional): If true, the option will be disabled and not selectable. |


## Functionality
`getOptionItemClassName`: A utility function that generates the appropriate class names based on the option's state (active, disabled, selected).

## Usage Example
```typescript jsx
import { Listbox as HListBox } from '@headlessui/react';
import { useState } from 'react';
import { Option, ListBoxItem } from './Option/Option';
import { Each } from '@/shared/lib/components/Each/Each';

const items: ListBoxItem<string>[] = [
    { value: 'option1', content: 'Option 1' },
    { value: 'option2', content: 'Option 2' },
    { value: 'option3', content: 'Option 3' },
];

export const SimpleListBoxWithOptions = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>('option1');

    return (
        <HListBox as="div" value={selectedValue} onChange={setSelectedValue}>
            {items.map(item => (
                <HListBox.Option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                >
                    <Each
                        of={items}
                        render={(item) => (
                            <Option key={item.value} item={item} />
                        )}
                    />
                </HListBox.Option>
            ))}
        </HListBox>
    );
};
```

## Conclusion
The `Option` component is a key part of creating dynamic and interactive dropdown lists. It provides visual feedback by highlighting active, selected, and disabled states, and can be easily integrated with other components for a seamless user experience. The use of **[Headless UI](https://headlessui.com/)** ensures accessibility and functionality, while the customizable styling allows for adaptable design in various applications.
