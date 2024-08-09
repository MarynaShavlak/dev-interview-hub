# LoginModal Component

## Overview
The **`LoginModal`** component provides a modal dialog specifically for user authentication. It leverages the `Modal` component from the redesigned UI library and integrates the `LoginForm` component for handling user login. By utilizing lazy loading for the `LoginForm`, the component optimizes performance by deferring the loading of the login form until the modal is opened. This approach reduces the initial load time of the application and enhances user experience by ensuring that resources are only loaded when needed.

## Type Definition
```typescript
interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}
```

### Props

The **`LoginModal`** component accepts the following props:

| Prop      | Type          | Required / Optional | Description                                                   |
|-----------|---------------|----------------------|---------------------------------------------------------------|
| `className` | `string`       | Optional             | Custom class name for additional styling.                     |
| `isOpen`   | `boolean`      | Required             | Controls the visibility of the modal.                         |
| `onClose`  | `() => void`   | Required             | Callback function to be executed when the modal is closed.     |

### Features

1. **Modal Integration**: The component utilizes the `Modal` component from the redesigned UI library to provide a consistent and modern modal experience. This integration ensures that the login form is presented within a well-designed modal interface.

2. **Lazy Loading**: By employing lazy loading for the `LoginForm`, the component ensures that the form is only loaded when the modal is opened. This optimizes performance by reducing the initial bundle size and improving the application's load time.

3. **Controlled Visibility**: The `isOpen` prop allows for controlled visibility of the modal, providing a clear and straightforward mechanism to manage the modal's display based on the application's state.

4. **Callback Management**: The `onClose` prop is used to handle modal closure, and it is also passed as a callback to the `LoginForm`. This design ensures that the modal closes only after a successful login, streamlining the user experience.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo(
    ({ className, isOpen, onClose }: LoginModalProps) => (
        <Modal
            className={className}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <LoginForm onSuccess={onClose} />
        </Modal>
    ),
);
```


### Conclusion

The **`LoginModal`** component is essential for presenting a login interface within a modal dialog, enhancing user authentication processes. Its integration with the `Modal` component and lazy loading for `LoginForm` ensures that performance is optimized by loading resources only when necessary. The controlled visibility and callback management further contribute to a seamless and efficient user experience. Overall, the component effectively balances design, performance, and usability, making it a crucial part of the authentication workflow in the application.
