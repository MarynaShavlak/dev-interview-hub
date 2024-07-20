# Stack Component
## Overview
The `Flex` component is a flexible and powerful layout tool for React projects. It allows developers to create stackable elements with customizable alignment, spacing, and direction, making it an essential component for building responsive and well-structured user interfaces.
component extends `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>` to allow standard div props, such as `role`, to be passed, providing the ability to use a `div` element with semantic roles like `navigation`.

## Type Definitions
The types used in the `Card` component are defined as follows:

```typescript
type FlexJustify = 'start' | 'center' | 'end' | 'between';
type FlexAlign = 'start' | 'center' | 'end';
type FlexDirection = 'row' | 'column';
type FlexGap = '0' | '4' | '8' | '16' | '24' | '32';
type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
    >;
```
## Props
The `Flex` component extends `DivProps` and accepts the following props:

| Prop        | Type            |       Required / Optional        | Description                                                        |
|-------------|-----------------|:--------------------------------:|--------------------------------------------------------------------|
| `children`  | `ReactNode`     |             Required             | The content to be displayed inside the stack.                      |
| `direction` | `FlexDirection` |             Required             | Specifies the direction of the stack, either column or row.        |
| `wrap`      | `FlexWrap`      | Optional<br/>(default: `nowrap`) | Specifies whether the stack items should wrap onto multiple lines. |
| `justify`   | `FlexJustify`   | Optional<br/>(default: `start`)  | Determines the horizontal alignment of the stack items.            |
| `align`     | `FlexAlign`     | Optional<br/>(default: `center`) | Determines the vertical alignment of the stack items.              |
| `gap`       | `FlexGap`       |   Optional<br/>(default: `0`)    | Specifies the gap between stack items.              |
| `className`  | `string`                                    |             Optional             | Additional custom class names to style the stack.                   |
| `max`        | `boolean`                                   |             Optional             | If `true`, the stack will expand to take the full available width.  |
| `fullHeight` | `boolean`                                   |             Optional             | If `true`, the stack will expand to take the full available height. |
| `otherProps` | `DivProps`   |             Optional             | Any additional div HTML attributes.                                 |

## Usage Examples

### Example 1: Basic Usage
```jsx
import { Flex} from '@/shared/ui/redesigned/Stack/Flex';

export const CustomStackExample = () => {
    return (
        <Flex direction="column" gap="16" align="start" max fullHeight>
            <div>This stack item has a gap of 16px.</div>
            <div>This stack item is aligned to the start.</div>
            <div>This stack expands to take the full width of its container.</div>
            <div>This stack expands to take the full height of its container.</div>
        </Flex>
    );
};
```
### Example 2: Semantic Roles Usage
```jsx
import { Flex} from '@/shared/ui/redesigned/Stack/Flex';

export const NavigationStack = () => {
    return (
        <Stack role="navigation" gap="8">
            {itemsList}
        </Stack>
    );
};
```

## Conclusion
The `Flex` component is a versatile and indispensable tool for creating organized and responsive layouts within React applications. Its wide range of customization options—including different directions, alignments, and spacing—ensures that developers can build stacks that are both functional and visually appealing. The ability to manage the layout and style dynamically makes the `Flex` component a crucial element for developing well-structured and user-friendly interfaces.
