# `CodeBlockComponent`

A reusable component for displaying code blocks with optional titles, supporting both redesigned and legacy UI versions.

## Props

| Prop        | Type      | Required | Description                          |
|-------------|-----------|----------|--------------------------------------|
| `code`      | `string`  | Yes      | The code content to display          |
| `title`     | `string`  | No       | Optional title for the code block    |
| `className` | `string`  | No       | Additional CSS class for styling     |

## Features

- 🎨 **Dual UI Support**: Automatically switches between redesigned and legacy versions
- 🏷️ **Optional Title**: Add a descriptive title above your code
- 📏 **Consistent Layout**: Uses `VStack` for proper spacing
- 🛠 **Feature Flag Ready**: Works with `ToggleFeaturesComponent`
- 
## Usage Example
```typescript jsx
<CodeBlockComponent
        code={`console.log('Hello world');`}
/>
```

With Title
```tsx
<CodeBlockComponent
  title="Example Function"
  code={`function greet() {\n  return "Hello";\n}`}
/>
```


## Conclusion
The **`CodeBlockComponent`** is a versatile and reusable component for rendering code blocks with optional titles. It ensures compatibility with both legacy and modern UI designs through the use of feature toggling. This component provides a clean solution for displaying code content in a React application while maintaining consistency across different design systems.
