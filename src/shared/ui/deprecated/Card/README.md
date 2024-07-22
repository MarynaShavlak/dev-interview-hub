# Card (Deprecated)
Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Card` component is a versatile and customizable container element for React projects. It allows developers to create visually distinct sections or panels with different styles and full-width options.

## Type Definitions
The types used in the `Card` component are defined as follows:

```typescript
export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}
```
## Props
The `Card` component extends `HTMLAttributes<HTMLDivElement>` and accepts the following props:

| Prop         | Type                             |          Required / Optional          | Description                                                        |
|--------------|----------------------------------|:-------------------------------------:|--------------------------------------------------------------------|
| `children`   | `ReactNode`                      |               Required                | The content to be displayed inside the card.                       |
| `className`  | `string`                         |               Optional                | Additional custom class names to style the card.                   |
| `theme`      | `CardTheme`                      |  Optional <br/>(default: `'NORMAL'`)  | Determines the visual style of the card.                           |
| `max`        | `boolean`                        |               Optional                | If `true`, the card will expand to take the full available width.  |
| `otherProps` | `HTMLAttributes<HTMLDivElement>` |               Optional                | Any additional div HTML attributes.                                |

## Usage Examples 
```jsx
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';

export const CustomCardExample = () => {
    return (
        <Card theme={CardTheme.OUTLINED}>
            <p>This card has an outlined theme and expands to take the full width of its container.</p>
        </Card>
    );
};
```
## Conclusion 
The `Card` component is a useful tool for creating structured sections within React applications. It offers customization options, including different themes and full-width expansion, ensuring that developers can create visually appealing and functional cards.
