# DeprecatedLoginForm

## Overview
The **`DeprecatedLoginForm`** component represents the legacy login interface, designed to handle user authentication with deprecated UI elements. This component provides a familiar login experience for users during the transition to a redesigned login form. It integrates older UI components while maintaining essential functionality and visual consistency with the previous design system.

## Props

The **`DeprecatedLoginForm`** component accepts the following props:

| Prop      | Type          | Required / Optional | Description                                                     |
|-----------|---------------|----------------------|-----------------------------------------------------------------|
| `onSuccess`  | `() => void`   | Required             | Callback function to be executed upon successful login.          |
| `className` | `string`       | Optional             | Custom class name for additional styling.                       |

## Features

1. **Legacy UI Integration**: Utilizes outdated UI components such as `Button`, `Input`, and `Text` to provide a consistent look and feel with the previous design system, ensuring a smooth user experience during the transition period.

2. **Form Handling**: Integrates the `useLoginForm` hook for managing login form state, including username and password inputs, error handling, and loading states. This setup ensures that form interactions are handled efficiently.

3. **Localized Text**: Employs the `useTranslation` hook to provide localized text for placeholders and error messages, enhancing accessibility and supporting multiple languages.


## Usage Example
```typescript jsx
import { DeprecatedLoginForm } from '@/entities/LoginForm/DeprecatedLoginForm';

const LoginPage = () => {
    const handleLoginSuccess = () => {
        console.log('Login successful');
    };

    return (
        <DeprecatedLoginForm
            className="login-form"
            onSuccess={handleLoginSuccess}
        />
    );
};
```
## Conclusion

The **`DeprecatedLoginForm`** component serves as a legacy login interface, maintaining continuity for users during the transition to newer design standards. Its primary role is to provide a functional login experience using deprecated UI elements while ensuring essential authentication features are preserved. This component integrates classic UI components and manages form state with the `useLoginForm` hook, allowing for efficient handling of user inputs and authentication processes. Despite its outdated design, it remains a crucial part of the application for users who interact with legacy systems or require familiarity with previous interfaces.
