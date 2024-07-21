# HStack 
## Overview
The `HStack` component is a streamlined version of the `Flex` component for creating horizontal stacks. By leveraging the `Flex` component, it offers a simplified way to align and distribute elements in a horizontal row, making it an essential tool for constructing horizontally oriented layouts in React projects.


## Type Definitions
The `HStack` component uses the same types as the `Flex` component but omits the `direction `property, as it is fixed to `'row'` for horizontal stacking.

```typescript
type HStackProps = Omit<FlexProps, 'direction'>;
```
## Props
The `HStack` component extends `Omit<FlexProps, 'direction'>` and accepts the following props:

| Prop        | Type            |       Required / Optional        | Description                                                        |
|-------------|-----------------|:--------------------------------:|--------------------------------------------------------------------|
| `children`  | `ReactNode`     |             Required             | The content to be displayed inside the vertical stack.                      |
| `wrap`      | `FlexWrap`      | Optional<br/>(default: `nowrap`) | Specifies whether the vertical stack items should wrap onto multiple lines. |
| `justify`   | `FlexJustify`   | Optional<br/>(default: `start`)  | Determines the horizontal alignment of the vertical stack items.            |
| `align`     | `FlexAlign`     | Optional<br/>(default: `center`) | Determines the vertical alignment of the vertical stack items.              |
| `gap`       | `FlexGap`       |   Optional<br/>(default: `0`)    | Specifies the gap between stack items.              |
| `className`  | `string`                                    |             Optional             | Additional custom class names to style the vertical stack.                   |
| `max`        | `boolean`                                   |             Optional             | If `true`, the vertical stack will expand to take the full available width.  |
| `fullHeight` | `boolean`                                   |             Optional             | If `true`, the vertical stack will expand to take the full available height. |
| `otherProps` | `DivProps`   |             Optional             | Any additional div HTML attributes.                                 |

## Usage Examples
```jsx
import { HStack } from '@/shared/ui/redesigned/HStack';

export const CustomHStackExample = () => {
    return (
        <HStack gap="16" justify="center" max>
            <div>This stack item has a gap of 16px.</div>
            <div>This stack item is horizontally centered.</div>
            <div>This stack expands to take the full width of its container.</div>
        </HStack>
    );
};
```
## Conclusion
The `HStack` component provides a simplified approach to creating horizontal stacks within React applications. By utilizing the `Flex` component and fixing the direction to `'row'`, the `HStack` component streamlines the process of building horizontally oriented layouts. Its customization options for alignment, spacing, and wrapping ensure that developers can create clean and organized horizontal stacks with minimal effort, enhancing the overall structure and design of user interfaces.
