# LoginForm Component

## Overview
The **`LoginForm`** component is designed to provide a flexible login interface that adapts based on the application's design configuration. Utilizing the `isAppRedesigned` feature flag, it renders either the `RedesignedLoginForm` or the `DeprecatedLoginForm`, ensuring alignment with the current design standards. The component employs lazy loading and dynamic reducer management to optimize performance and reduce the initial bundle size. By leveraging `DynamicModuleLoader`, it ensures that the `loginReducer` is only loaded when necessary, which is particularly beneficial for scenarios where the login form is not needed (e.g., for already authenticated users). This approach helps keep the main bundle smaller and improves overall application efficiency.

## Type Definition
```typescript
interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}
```

### Props

The **`LoginForm`** component accepts the following props:

| Prop         | Type          | Required / Optional | Description                                                      |
|--------------|---------------|----------------------|------------------------------------------------------------------|
| `onSuccess`   | `() => void`   | Required             | Callback function to be executed upon successful login.           |
| `className`   | `string`       | Optional             | Custom class name for additional styling.                        |

### Features

1. **Feature Flag Driven**: The component adapts its UI between `RedesignedLoginForm` and `DeprecatedLoginForm` based on the `isAppRedesigned` feature flag, ensuring the login interface matches the current application design.

2. **Dynamic Reducer Management**: Utilizes `DynamicModuleLoader` to dynamically manage the `loginReducer`. This feature is particularly advantageous for keeping the main bundle size minimal. For instance, the `loginReducer` is only loaded when the login form is needed, such as for users who are not yet authenticated. This approach helps avoid unnecessary code loading, enhancing the application's performance.

3. **Performance Optimization**: Implements lazy loading through `LoginFormAsync`, which defers the loading of the `LoginForm` component until it is required. This reduces the initial load time of the application, further optimizing performance and improving user experience.


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
The **`LoginForm`** component is integral to the authentication process, providing a design-adaptive login interface through feature flags. Its use of `DynamicModuleLoader` ensures that reducers are only loaded when necessary, optimizing the bundle size and performance by avoiding unnecessary code for authenticated users. Combined with lazy loading, the component enhances overall application efficiency, delivering a seamless and responsive login experience while maintaining a lean and performant codebase.
