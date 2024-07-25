# NotificationButtonTrigger

## Overview
The **`NotificationButtonTrigger`**  component serves as an interactive button designed to trigger notifications within an application. It adapts to different feature sets based on application configurations, providing an updated user interface for notification actions.

## Type Definition
```typescript
interface TriggerProps {
    onClick: () => void;
}
```

## Props
The **`NotificationButtonTrigger`** component accepts the following props:

| Prop       | Type           | Required / Optional | Description                                          |
|------------|----------------|---------------------|------------------------------------------------------|
| `onClick`| `() => void`   | Required            | Callback function to handle button click events.     |


## Features
1.**Click Handling**: Provides a straightforward mechanism for handling click events through the `onClick` prop, making it easy to connect with notification-related actions or state changes.

2.**Design Adaptation**: Renders different UI elements based on whether the redesigned interface is enabled or not. This ensures consistency with the application's design system.

## Usage Example
```typescript jsx
import  { memo, useCallback, useState } from 'react';
import { NotificationButtonTrigger } from './NotificationButtonTrigger/NotificationButtonTrigger';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

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
        <div>
            <NotificationButtonTrigger onClick={onOpenDrawer} />
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                <NotificationList />
            </Drawer>
        </div>
    );
});
```
## Conclusion
The **`NotificationButtonTrigger`** component is a versatile and essential UI element for managing notification interactions in an application. Its ability to adapt to different feature sets and design systems ensures that it provides a consistent user experience. By offering modern and legacy UI options, it enhances compatibility and user engagement, making it a valuable component for any application.
