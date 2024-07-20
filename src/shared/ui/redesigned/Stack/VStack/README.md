# VStack Component
## Overview
The `VStack` component is a simplified and specialized version of the `Flex` component for creating vertical stacks. It leverages the `Flex` component to provide an easy and concise way to align and distribute elements in a vertical column, making it a valuable tool for creating vertically oriented layouts in React projects.


## Type Definitions
The `VStack` component uses the same types as the `Flex` component but omits the `direction `property, as it is fixed to `'column'` for vertical stacking.

```typescript
type VStackProps = Omit<FlexProps, 'direction'>;
```
## Props
The `VStack` component extends `Omit<FlexProps, 'direction'>` and accepts the following props:

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
import { VStack } from '@/shared/ui/redesigned/VStack';

export const CustomVStackExample = () => {
    return (
        <VStack gap="16" justify="center" max>
            <div>This stack item has a gap of 16px.</div>
            <div>This stack item is horizontally centered.</div>
            <div>This stack expands to take the full width of its container.</div>
        </VStack>
    );
};
```
## Conclusion
The `VStack` component provides a streamlined approach to creating vertical stacks within React applications. By utilizing the `Flex` component and fixing the direction to `'column'`, the `VStack` component simplifies the process of building vertically oriented layouts. Its customization options for alignment, spacing, and wrapping ensure that developers can create clean and organized vertical stacks with minimal effort, enhancing the overall structure and design of user interfaces.
