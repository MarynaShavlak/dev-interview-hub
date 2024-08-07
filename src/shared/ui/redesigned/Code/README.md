# Code
## Overview
The **`Code`** component is a React component designed to render a code snippet with an integrated copy-to-clipboard functionality. It features a clickable icon that allows users to copy the code snippet to their clipboard easily. This component provides a simple and effective way to display code with an interactive copy feature.

## Interface
The types used in the **`Code`** component are defined as follows:

- **`CodeProps`**: An interface that defines the properties accepted by the **`Code`** component.
```typescript
interface CodeProps {
    className?: string;
    text: string;
}
```
## Props
The **`Code`** component accepts the following props:

| props        | Type          | Required / Optional      | Description      |
| -------------| ------------- | :---: |--------------------------------------- |
| text        | string  | Required         |The code snippet to be displayed and copied|
| className    | string  | Optional          |Additional custom class names for styling the component |

## Features
1. **Code Display**: The **`Code`** component displays the provided code snippet inside a `<pre>` tag, which maintains the formatting of the code. The code snippet is wrapped in a `<code>` tag for proper styling.

2. **Copy Functionality**: A copy button, represented by the `CopyIconNew` icon, is displayed alongside the code snippet. When clicked, it triggers the `onCopy` function, which copies the code snippet to the clipboard using the `navigator.clipboard.writeText API`.

## Usage Examples 
Here are some examples of using the **`Code`** component in different scenarios:

### Example 1: Basic Code Display
```typescript jsx
import { Code } from '@/shared/ui/deprecated/Code';

const BasicCodeDisplay = () => {
    return <Code text="const example = 'Hello, world!';" />;
};

export default BasicCodeDisplay;
```

### Example 2: Code Display with Long Code
```typescript jsx
import { Code } from '@/shared/ui/deprecated/Code';

const LongCodeDisplay = () => {
    return <Code text={`function longFunctionName(param1, param2) {\n    return param1 + param2;\n}`} />;
};

export default LongCodeDisplay;
```

## Conclusion
The **`Code`** component is a practical and interactive React component for displaying code snippets with built-in copy-to-clipboard functionality. It allows for customization through additional class names and ensures that users can easily copy the displayed code. By integrating a clickable icon for copying, the component enhances user experience while maintaining a clean and consistent interface.
