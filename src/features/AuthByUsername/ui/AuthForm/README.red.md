# AuthFormRedesigned 

## Overview
The **`AuthFormRedesigned`** component offers a contemporary login interface designed to provide an improved user experience with modern UI elements and enhanced functionality. It is optimized for better usability and aesthetics, replacing older login form designs with a more refined and user-friendly approach. The component integrates seamlessly with the application's internationalization setup and leverages the `useSignInForm` hook for managing form state and actions.

## Props

The **`AuthFormRedesigned`** component accepts the following props:

| Prop      | Type          | Required / Optional | Description                                                     |
|-----------|---------------|----------------------|-----------------------------------------------------------------|
| `onSuccess`  | `() => void`   | Required             | Callback function to be executed upon successful login.          |
| `className` | `string`       | Optional             | Custom class name for additional styling.                       |

## Features

1. **Modern Design**: Utilizes updated UI components from the redesigned library, including `VStack`, `Button`, `Input`, and `Text`, to provide a visually appealing and consistent login experience.

2. **Internationalization**: Integrates with `react-i18next` for translation, allowing the form to display text in multiple languages based on user preferences.

3. **Enhanced Error Handling**: Provides clear and user-friendly error messages using the `Text` component with error styling, ensuring that users are promptly informed of login issues.



## Usage Example
```typescript jsx
import { AuthFormRedesigned } from '@/entities/AuthForm/AuthFormRedesigned';

const LoginPage = () => {
    const handleLoginSuccess = () => {
        console.log('Login successful');
    };

    return (
        <AuthFormRedesigned
            className="login-form"
            onSuccess={handleLoginSuccess}
        />
    );
};
```
## Conclusion

The **`AuthFormRedesigned`** component is a modern and visually appealing login interface designed to enhance user experience with contemporary UI elements. Its purpose is to offer a sophisticated and functional login solution that aligns with current design standards. By utilizing advanced UI components and incorporating seamless internationalization support, this component ensures an efficient and user-friendly authentication process. It plays a pivotal role in providing a polished and responsive login experience, reflecting the application's commitment to modern design and improved usability.
