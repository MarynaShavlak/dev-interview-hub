# Button (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The **`Button`** component is a highly customizable and flexible button designed for a wide range of applications in a React project. 
It allows developers to easily implement various visual styles, sizes, making it an essential component for creating interactive and consistent user interfaces.

## Type Definitions
The types used in the **`Button`** component are defined as follows:
```typescript
export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
    OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}
```
## Props 
The **`Button`** component extends **`ButtonHTMLAttributes<HTMLButtonElement>`** and it  accepts the following props:

| Prop         | Type                                      |          Required / Optional          | Description                                                                 |
|--------------|-------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `className`  | `string`                                  |               Optional                | Additional custom class names to style the button.                          |
| `theme`      | `ButtonTheme`                             | Optional <br/> (default: `'OUTLINE'`) | Determines the visual style of the button.                                  |
| `square`     | `boolean`                                 |               Optional                | If `true`, the button will have a square shape.                             |
| `size`       | `ButtonSize`                              |    Optional <br/> (default: `'M'`)    | Specifies the size of the button.                                           |
| `disabled`   | `boolean`                                 |               Optional                | If `true`, the button will be disabled and non-interactive.                 |
| `children`   | `ReactNode`                               |               Optional                | The content to be displayed inside the button.                              |
| `max`        | `boolean`                                 |               Optional                | If `true`, the button will expand to take the full available width.         |
| `otherProps` | `ButtonHTMLAttributes<HTMLButtonElement>` |               Optional                | Any additional button HTML attributes.                                      |

## Features
- **Customizable  Themes**: Choose from multiple visual styles (`clear`, `clearInverted`, `outline`, **background`, **backgroundInverted`, `outline_red`), allowing the button to fit different contexts and design needs.

- **Flexible Sizes**: Available in sizes `size_m`, `size_l`, `size_xl`,  making the button adaptable to various use cases from medium icons to large call-to-action buttons.

- **Square Shape Option**: Enable the **`square`**`prop to create a square-shaped button, ideal for compact layouts or icon buttons.

- **Disabled State**: Use the **`disabled`** prop to make the button non-interactive, useful during form validation, loading states or denying actions for some users.

- **Content Customization**: Utilize the **`children`** prop to include any content inside the button, from simple text to complex HTML structures.

- **Full-Width Option**: The **`max`** prop allows the button to expand to the full width of its container, making it suitable for responsive designs.

  
## Ref Forwarding
The **`Button`** component uses **`forwardRef`** to enable ref forwarding. This is particularly important in scenarios where the button needs to integrate with external libraries or components that rely on refs for internal operations, such as the **`Listbox`** component from **[Headless UI](https://headlessui.com/)**.

Using **`forwardRef`** allows the button to forward refs to its underlying HTML element, making it compatible with components that require a ref to be passed down. This is crucial for ensuring that the button functions correctly within complex UI libraries and maintains compatibility with various interactive elements.


## Usage Examples

### 1. Basic Button with Click Handler
```typescript jsx
import { Button } from '@/shared/ui/deprecated/Button';

export const BasicButtonExample = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <Button onClick={handleClick}>
            Click Me
        </Button>
    );
};
```

### 2. Button with other props( disabled, max, square, size, theme)

```typescript jsx
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import ArrowIcon from '@/shared/assets/icons/left-arrow.svg';
import { ButtonTheme } from './Button';

export const ButtonWithOtherProps = () => {
    return (
        <Button max suare disabled size="l" theme={ButtonTheme.BACKGROUND}>
            Button with other props
        </Button>
    );
};
```

### 4. Button with Headless UI Listbox
```typescript jsx
import { Listbox as HListBox } from '@headlessui/react';
import { Button, ButtonTheme } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ListBoxItem } from '../OptionItem/OptionItem';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export function SelectedItem() {
    const { readonly } = props;

    return (
        <HListBox.Button
            as={Button}
            theme={ButtonTheme.CLEAR_INVERTED}
            disabled={readonly}
        >
            content of button 
        </HListBox.Button>
    );
}
```

## Conclusion
The **`Button`** component is a versatile and powerful element designed to fit various use cases within React applications. 
Its extensive range of customization options—including multiple variants, sizes —allows developers to create buttons that are both visually appealing and functionally effective. 
The ability to control the button's shape, size, and state ensures that it can be adapted to different design requirements and user interactions. 
