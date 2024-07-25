# BrowserNotificationPopover

## Overview
The **`BrowserNotificationPopover`** component is a versatile UI element designed for desktop devices, providing a context-sensitive popover for displaying notifications. 
It adapts seamlessly to both modern and legacy design systems, ensuring a consistent and user-friendly interface.

## Type Definition
```typescript
interface BrowserNotificationPopoverProps {
    className?: string;
    trigger: React.ReactNode;
}
```

## Props
The **`BrowserNotificationPopover`** component accepts the following props:

| Prop       | Type         | Required / Optional | Description                                          |
|------------|--------------|---------------------|------------------------------------------------------|
| `trigger`| `ReactNode` | Required            | A React node that triggers the popover when interacted with.     |
| `className`| `string`     | Optional            | Additional CSS classes to apply to the popover.     |


## Features
1. **Design Adaptation**: Renders different UI elements based on whether the redesigned interface is enabled or not. This ensures consistency with the application's design system.

2. **Notification Display**: Integrates with the `NotificationList` component to show notifications within the popover, providing a consistent and intuitive way to manage notification interaction.

3. **Customizable Trigger**: Accepts a customizable `trigger` prop, allowing for flexibility in how the popover is activated. This can be any React node, such as a button or icon.

## Usage Example
```typescript jsx
import  { memo, useCallback, useState } from 'react';
import { BrowserView} from 'react-device-detect';
import { NotificationButtonTrigger } from './NotificationButtonTrigger/NotificationButtonTrigger';
import { BrowserNotificationPopover } from './BrowserNotificationPopover/BrowserNotificationPopover';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
            <BrowserView>
                <BrowserNotificationPopover
                    className={className}
                    trigger={
                        <NotificationButtonTrigger onClick={onOpenDrawer} />
                    }
                />
            </BrowserView>
    );
});
```
## Conclusion
The **`BrowserNotificationPopover`** component is an essential tool for managing notifications in desktop applications. 
Its adaptability to various design systems and customizable trigger mechanism make it a robust choice for providing users with a seamless notification experience
