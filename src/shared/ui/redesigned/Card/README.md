# Card
## Overview
The `Card` component is a versatile and highly customizable container element for React projects. It allows developers to create visually distinct sections, cards, or panels with various styles, padding, and border options, making it a valuable component for building organized and consistent user interfaces.

## Type Definitions
The types used in the `Card` component are defined as follows:

```typescript
export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'classic' | 'round' | 'partial';
```
## Props
The `Card` component extends `HTMLAttributes<HTMLDivElement>` and accepts the following props:

| Prop         | Type                                        |       Required / Optional        | Description                                                        |
|--------------|---------------------------------------------|:--------------------------------:|--------------------------------------------------------------------|
| `children`   | `ReactNode`                                 |             Required             | The content to be displayed inside the card.                       |
| `className`  | `string`                                    |             Optional             | Additional custom class names to style the card.                   |
| `variant`    | `CardVariant` |  Optional <br/>(default: `'normal'`)  | Determines the visual style of the card.                           |
| `max`        | `boolean`                                   |             Optional             | If `true`, the card will expand to take the full available width.  |
| `fullHeight` | `boolean`                                   |             Optional             | If `true`, the card will expand to take the full available height. |
| `padding`    | `CardPadding`                                   |    Optional <br/>(default: `'8'` )    | Specifies the padding inside the card.                             |
| `border`     | `CardBorder`                                   | Optional <br/>(default: `'classic'` ) | Specifies the border style of the card.                            |
| `otherProps` | `HTMLAttributes<HTMLDivElement>`   |             Optional             | Any additional div HTML attributes.                                |

## Usage Examples 
```jsx
import { Card } from '@/shared/ui/redesigned/Card';

export const CustomCardExample = () => {
    return (
        <Card padding="16" border="round" max>
            <p>This card has custom padding and a rounded border.</p>
            <p>This card expands to take the full width of its container.</p>
        </Card>
    );
};
```
## Conclusion 
The `Card` component is an adaptable and essential tool for creating structured and visually appealing sections within React applications. Its extensive range of customization options—including different variants, padding sizes, and border styles—ensures that developers can create cards that are both functional and aesthetically pleasing. The ability to manage content layout and style dynamically makes the `Card` component a crucial element for building organized and user-friendly interfaces.
