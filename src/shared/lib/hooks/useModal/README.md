# useModal hook
A custom React hook designed to manage modal state, handle animations, and set up event listeners. It simplifies the process of opening and closing modals with animation and supports keyboard interaction.

## Parameters
- **`animationDelay`** The duration (in milliseconds) of the modal's closing animation. Determines how long the modal will take to close after triggering the **`close`** function.
- **`isOpen`**: A boolean flag indicating whether the modal is currently open. Controls the visibility and mounting of the modal.
- **`onClose`**: An optional callback function that is invoked when the modal is closed. Useful for executing additional logic or cleanup when the modal is dismissed.


## Returns 
An object with the following properties:
- **`isClosing`** : Indicates whether the modal is currently in the process of closing. TCan be used to apply specific styles or logic during the closing animation.
- **`isMounted`** : Reflects whether the modal is currently mounted. Helps in managing the modal’s lifecycle and rendering.
- **`close`**: A function that triggers the modal's closing sequence. Initiates the closing animation and invokes the **`onClose`** callback after the animation delay.


## Internal Behavior

1. **State Management**:
   - **`isClosing`**: Indicates if the modal is in the process of closing. Initially set to **`false`** and changes to **`true`** when the **`close`** function is invoked.
   - **`isMounted`**: Indicates if the modal is currently mounted in the DOM. Initially set to **`false`** and changes to **`true`** when **`isOpen`** becomes **`true`**.

2. **Refs**:
   - **`timerRef`**: Holds a reference to the **`setTimeout`** timer using the **`useRef`** hook. Allows clearing the timeout if the modal closes early or the component unmounts, preventing memory leaks.

3. Callbacks:
   - **`close`**: Initiates the closing sequence of the modal. Sets **`isClosing`** to **`true`**, starts a timer based on **`animationDelay`**, and calls the **`onClose`** callback if provided. Resets **`isClosing`** to **`false`** after the animation delay.
   - **`onKeyDown`**: Handles the `Escape` key event, triggering the **`close`** function when the Escape key is pressed.

4. Effects:
    - The first **`useEffect`** runs when **`isOpen`** changes. If **`isOpen`** is **`true`**, it sets **`isMounted`** to **`true`**.
    - The second **`useEffect`** runs when **`isOpen`** or **`onKeyDown`** changes. If **`isOpen`** is **`true`**, it adds a `keydown` event listener to the window to listen for the Escape key to close the modal. Clears any existing timeouts and removes the event listener when the component unmounts or **`isOpen`** changes to **`false`**.


## Usage Example
```typescript jsx
import React, { ReactNode, useState } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import cls from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    const { children, isOpen, onClose } = props;
    const { isClosing, isMounted, close } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });
    
   if (!isMounted) {
      return null;
   }

    return (
        <Portal element={document.getElementById('app')}>
           <div className={isClosing && cls.isClosing}>
              <Overlay onClick={close} />
              <div>{children}</div>
           </div>
        </Portal>
    );
};

export default Modal;
```

## Conclusion 
The **`useModal`** hook manages the modal's visibility, handles closing animations, and adds keyboard accessibility. It uses two pieces of state (**`isClosing`** and **`isMounted`**) to control the modal`s visibility and closing animations. It also sets up event listeners to handle closing the modal when the Escape key is pressed and manages the timeout using a ref to ensure proper cleanup and prevent errors when the component is unmounted.
