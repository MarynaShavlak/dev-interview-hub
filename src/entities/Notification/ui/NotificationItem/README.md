# NotificationItem

## Overview
The **`NotificationItem`** component is designed to present individual notifications in a React application. It offers a versatile interface that adapts to both redesigned and deprecated UI elements based on feature flags. This component displays notification details, such as title and description, within a styled card. It also provides functionality for handling clickable notifications with optional links.

## Type Definition 
```typescript
interface NotificationItemProps {
   className?: string;
   item: Notification;
}
```

## Props
The **`NotificationItem`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `item` | `Notification` | Required            | The notification object containing the title, description, and optional link. |
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render UI elements based on the current feature flags, ensuring the component remains adaptable to both new and old designs.

2. **Clickable Notifications**: If the notification object includes a `href` property, the component renders the notification within a clickable link. This allows users to navigate to additional details or external resources associated with the notification.

## Usage Example
```typescript jsx
import { NotificationItem } from '@/entities/Comment';
import { Comment } from '@/entities/Comment';

const sampleNotification: Notification = {
    title: 'New Comment',
    description: 'You have a new comment on your article.',
    href: 'https://example.com/notification-details'
};

const App = () => {
    return (
        <div>
            <NotificationItem
                className="customNotificationItem"
                item={sampleNotification}
            />
            {/* The NotificationItem component displays a notification with optional link and adapts to feature flags */}
        </div>
    );
};
```
## Conclusion
The **`NotificationItem`** component is crucial for displaying individual notifications in a React application, providing a flexible and feature-rich interface. 
It handles both redesigned and deprecated UI elements through feature toggling, ensuring compatibility with varying design systems. The component also supports clickable notifications, enhancing user interaction by linking to additional details or external resources. 
By integrating modern and legacy UI elements, `NotificationItem` ensures a consistent and adaptive user experience across different application versions.
