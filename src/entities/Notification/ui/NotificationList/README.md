# NotificationList

## Overview
The **`NotificationList`** component is designed to display a list of notifications in a React application. It dynamically adapts to either redesigned or deprecated UI elements based on feature flags, providing a flexible and modern interface.

This component integrates with the notification API to fetch and display notifications, and it includes a polling mechanism to ensure that the notification list remains current. Notifications are refreshed every 10 seconds to provide users with the latest updates without requiring manual refreshes. The component also includes a loading state with skeleton screens to enhance user experience while data is being fetched.

## Type Definition
```typescript
interface NotificationListProps {
    className?: string;
}
```

## Props
The **`NotificationList`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render UI elements based on the current feature flags, ensuring the component remains adaptable to both new and old designs.

2. **Loading State**: Displays skeleton screens while notifications are being fetched from the API. This provides a placeholder that mimics the final content, improving the user experience during data loading.

3. **Polling for Updates:**: Configures polling to refresh notifications every 10 seconds, ensuring that the list remains up-to-date with the latest notifications

## Usage Example
```typescript jsx
import { NotificationList } from '@/entities/Notification';

const App = () => {
    return (
        <div>
            <NotificationList className="customNotificationList" />
            {/* The NotificationList component fetches and displays notifications, adapting to feature flags and providing a loading state */}
        </div>
    );
};
```
## Conclusion
The **`NotificationList`** component is essential for presenting notifications in a React application with a dynamic and adaptive interface. By leveraging feature toggling, it supports both redesigned and legacy UI elements, ensuring compatibility across different design systems. The component effectively manages loading states with skeleton screens and maintains up-to-date notification content through polling. This ensures a smooth and responsive user experience, keeping users informed with the latest updates.
