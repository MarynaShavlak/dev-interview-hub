# Text Component
## Overview
The `Text` component is designed to provide a flexible and consistent way to display text content in a React application. It supports various visual styles, sizes, and alignment options, making it suitable for displaying headings, paragraphs, error messages, and accentuated text. The component allows developers to control the appearance of text through props, ensuring that the text adheres to the application's design system. 
`Text` component helps maintain semantic HTML structure while offering extensive customization. This component is ideal for use in interfaces that require clear and visually appealing text presentation, such as forms, notifications, and content sections.

## Type Definitions 
The types used in the `Text` component are defined as follows:

```typescript
export type TextVariant = 'primary' | 'error' | 'accent';
export type TextAlign = 'right' | 'left' | 'center';
export type TextSize = 's' | 'm' | 'l';
```

## Props
The `Text` component extends `TestProps` and it accepts the following props:

| Prop          | Type                       |          Required / Optional          | Description                                                       |
|---------------|----------------------------|:-------------------------------------:|-------------------------------------------------------------------|
| `className`   | `string`                   |               Optional                | Additional custom class names to style the text.                  |
| `title`       | `string`                   |               Optional                | The title text to be displayed in a header tag.                   |
| `text`        | `string`                   |               Optional                | The main text content to be displayed in a paragraph tag.         |
| `variant`     | `TextVariant`              | Optional <br/> (default: `'primary'`) | Determines the visual style of the text.                          |
| `align`       | `TextAlign`                |  Optional <br/> (default: `'left'`)   | Specifies the alignment of the text.                              |
| `size`        | `TextSize`                 |    Optional <br/> (default: `'m'`)    | Specifies the size of the text.                                   |
| `bold`        | `boolean`                  |               Optional                | If `true`, the text will be displayed in bold.                    |
| `data-testid` | `string`                   |               Optional                | Custom test ID for testing purposes.                              |


## Usage Examples

```jsx
import { Text } from '@/shared/ui/redesigned/Text';

export const AlignedBoldTextExample = () => {
    return (
        <Text
            align="center"
            bold
            size="l"
            variant="accent"
            title="Centered Bold Title"
            text="This text is centered and bold."
        />
    );
};
```

## Conclusion
The `Text` component is a versatile and powerful element designed to fit various use cases within React applications. Its extensive range of customization options—including multiple variants, sizes, alignments, and the ability to emphasize text—allows developers to create text displays that are both visually appealing and functionally effective. The ability to control the text's appearance and alignment ensures that it can be adapted to different design requirements and user interactions. With its support for custom header tags and bold styling, the `Text` component is an essential tool for building consistent and engaging user interfaces.
