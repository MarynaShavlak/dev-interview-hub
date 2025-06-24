# `TextBlockComponent`

A reusable component for rendering formatted text blocks with optional titles and HTML tag support.

## Type Definition 
```typescript
interface TextBlockComponentProps {
   className?: string;
   title?: string;
   paragraphs: string[];
   withTags?: boolean;
}
```

## Props

| Prop         | Type        | Required | Default | Description                          |
|--------------|-------------|----------|---------|--------------------------------------|
| `title`      | `string`    | No       | -       | Optional title for the text block    |
| `paragraphs` | `string[]`  | Yes      | -       | Array of text paragraphs to display  |
| `withTags`   | `boolean`   | No       | `false` | Enables HTML tag parsing in text     |
| `className`  | `string`    | No       | -       | Additional CSS classes               |

## Features

### Text Formatting
- Supports HTML tags in text when `withTags` is true (`<b>`, `<i>`, `<a>` etc.)
- Automatically converts tags to appropriate styled components
- Preserves text formatting and line breaks

### Dual Design System Support
- **Redesigned UI**: Modern text styling with improved typography
- **Legacy UI**: Maintains consistency with older design system
- Automatic switching based on feature flag

### Layout
- Vertical stacking of paragraphs with consistent 8px gap
- Responsive design that adapts to container width
- Proper spacing between title and content
- 
## Usage Example

### Basic Usage
```typescript jsx
<TextBlockComponent
        paragraphs={[
           'First paragraph of text',
           'Second paragraph with more content'
        ]}
/>
```
### With Title
```typescript jsx
<TextBlockComponent
        title="Important Notice"
        paragraphs={[
           'This is the first paragraph under the title.',
           'Additional details go here.'
        ]}
/>
```
### With HTML Tags
```typescript jsx
<TextBlockComponent
        title="Formatted Content"
        withTags={true}
        paragraphs={[
           'This text contains <b>bold elements</b> and <i>italics</i>',
           'Links like <a href="#example">this</a> work too'
        ]}
/>
```

## Conclusion
The **`TextBlockComponent`** provides a flexible solution for rendering formatted text content throughout your application. By combining essential features like optional titles, HTML tag support, and dual-design system compatibility, it serves as a robust building block for content display.
