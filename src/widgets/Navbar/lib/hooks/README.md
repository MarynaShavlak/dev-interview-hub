# useAuthModal Hook
A custom React hook designed to manage the visibility of an authentication modal. It simplifies the process of showing and hiding the modal with straightforward state management.

## Parameters
This hook does not take any parameters.

## Returns
An object with the following properties:
- **`isAuthModal`**: A boolean indicating whether the authentication modal is currently visible or not. Controls the display of the modal.
- **`onShowModal`**: A function to show the authentication modal. Sets the `isAuthModal` state to `true`.
- **`onCloseModal`**: A function to hide the authentication modal. Sets the `isAuthModal` state to `false`.

## Internal Behavior

1. **State Management**:
    - **`isAuthModal`**: A piece of state managed using the `useState` hook. It determines whether the authentication modal is currently open or closed. Initialized to `false` (modal closed).

2. **Callbacks**:
    - **`onShowModal`**: A memoized function created using `useCallback` to open the authentication modal. It sets the `isAuthModal` state to `true`.
    - **`onCloseModal`**: A memoized function created using `useCallback` to close the authentication modal. It sets the `isAuthModal` state to `false`.

## Usage Example
```typescript jsx
import React from 'react';
import { useAuthModal } from '@/shared/lib/hooks/useAuthModal/useAuthModal';
import { Modal } from '../Modal/Modal'; // Assume Modal is a component for displaying modals

const AuthComponent = () => {
    const { isAuthModal, onShowModal, onCloseModal } = useAuthModal();

    return (
        <div>
            <button onClick={onShowModal}>Open Auth Modal</button>
            {isAuthModal && (
                <Modal onClose={onCloseModal}>
                    <h2>Authentication Required</h2>
                    {/* Auth form or content goes here */}
                    <button onClick={onCloseModal}>Close</button>
                </Modal>
            )}
        </div>
    );
};
export default AuthComponent;
```
## Conclusion
The `useAuthModal` hook provides a simple and effective solution for managing the visibility of an authentication modal. It offers straightforward state management with two primary functions: `onShowModal` and `onCloseModal`, which control the visibility of the modal. This hook abstracts the modal state logic, making it easy to integrate modal functionality into React components while keeping the implementation clean and maintainable.
