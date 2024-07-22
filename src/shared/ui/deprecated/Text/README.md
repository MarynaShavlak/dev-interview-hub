# Text (Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Text` component is designed to provide a flexible and consistent way to display text content in a React application. 
The component allows developers to control the appearance of text through props, ensuring that the text adheres to the application's design system. 
`Text` component helps maintain semantic HTML structure while offering extensive customization. 

## Type Definitions 
The types used in the `Text` component are defined as follows:

```typescript
export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}
```

## Props
The `Text` component extends `TestProps` and it accepts the following props:

| Prop          | Type        |          Required / Optional          | Description                                                       |
|---------------|-------------|:-------------------------------------:|-------------------------------------------------------------------|
| `className`   | `string`    |               Optional                | Additional custom class names to style the text.                  |
| `title`       | `string`    |               Optional                | The title text to be displayed in a header tag.                   |
| `text`        | `string`    |               Optional                | The main text content to be displayed in a paragraph tag.         |
| `theme`       | `TextTheme` | Optional <br/> (default: `'PRIMARY'`) | Determines the visual style of the text.                          |
| `align`       | `TextAlign` |  Optional <br/> (default: `'LEFT'`)   | Specifies the alignment of the text.                              |
| `size`        | `TextSize`  |    Optional <br/> (default: `'M'`)    | Specifies the size of the text.                                   |
| `data-testid` | `string`    |               Optional                | Custom test ID for testing purposes.                              |


## Usage Examples

```jsx
import { Text, TextAlign, TextTheme, TextSize } from '@/shared/ui/deprecated/Text';

export const TextExample = () => {
    return (
        <Text
            align={TextAlign.CENTER}
            size={TextSize.L}
            theme={TextTheme.PRIMARY}
            title="Centered Title"
            text="This text is centered."
        />
    );
};
```

## Conclusion
The `Text` component is a versatile and powerful element designed to fit various use cases within React applications.
Its extensive range of customization options—including multiple themes, sizes, and alignments—allows developers to create text displays that are both visually appealing and functionally effective.
The ability to control the text's appearance and alignment ensures that it can be adapted to different design requirements and user interactions. 
With its support for custom header tags, the `Text` component is an essential tool for building consistent and engaging user interfaces.
