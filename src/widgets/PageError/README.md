# PageError 

## Overview
The **`PageError `** widget is designed to handle unexpected errors within a React application, providing a user-friendly interface to inform users of issues and prompt necessary actions, such as reloading the page.

## Props 
The **`PageError`** widget accepts the following props:

| Prop         | Type                                        |          Required / Optional          | Description                                                                 |
|--------------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `className`  | `string`                                    |               Optional                | Additional custom class names for styling purposes.                         |

## Features
- **Error Message Display**: Renders an error message to inform users about the encountered issue.
- **Reload Button**: Includes a button that, when clicked, reloads the current page to attempt recovery from the error.
- **Feature Toggles**: Supports feature toggling to conditionally apply different styles or behaviors based on feature flags.


## Usage Example

```typescript jsx
import { PageError } from '@/widget/PageError';

const ErrorView = () => {
    return (
        <PageError className="custom-error-page" />
    );
};
```

## Conclusion
The **`PageError`** widget provides a straightforward solution for handling and recovering from unexpected errors in a React application. By displaying clear error messages and offering a reload option, it enhances user experience by guiding them through error resolution steps effectively. Its modular design and customizable styling options make it a valuable component for ensuring robust error management in various application contexts.
