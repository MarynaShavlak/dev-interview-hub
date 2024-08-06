# `notificationApi`: API Documentation

## Overview

The `notificationApi` is a set of endpoints created using `rtkApi` for managing user notifications. 
This API provides functionality to retrieve notifications for users, allowing for effective and timely communication.

## Description
The `notificationApi` includes one primary endpoint:
- `getNotifications`: A **query** endpoint to fetch notifications for the current user.

This endpoint utilizes Redux Toolkit Query for efficient data fetching and state management, ensuring a smooth experience for managing notifications.

### Import Details
- `rtkApi`: The base API service from **'@/shared/api/rtkApi'**.
- `Notification`: The type definition for article ratings from **'../model/types/notification'**.

###  Parameters
`getNotifications` Query expects expects no parameters.

### Type Parameters 
For `getNotifications`-  `<Notification[], null>`:
   - `Notification[]` indicates that the query returns an array of notification objects.
   - `null` signifies that the query does not require any parameters.

### Query Functions

`getNotifications`
The `query` function constructs the request object, setting the URL to `/notifications`.
This endpoint retrieves notifications for the current user.


### Exported Endpoints
- `useNotifications`: A hook for initiating the `getNotifications` query.


## Usage Examples
### Example 1: Fetching Notifications
```typescript jsx
import { useNotifications } from 'path/to/notificationApi';

const NotificationsComponent = () => {
   const { data: notifications, isLoading, error } = useNotifications();

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p>Error fetching notifications.</p>;

   return (
           <div>
              <h1>Notifications</h1>
              {notifications?.map(notification => (
                      <div key={notification.id}>
                         <h2>{notification.title}</h2>
                         <p>{notification.description}</p>
                      </div>
              ))}
           </div>
   );
};
```

## Conclusion
The `notificationApi` provides a streamlined way to manage user notifications, enhancing the user experience by delivering timely updates. Utilizing Redux Toolkit Query ensures efficient data fetching and state management, simplifying the integration of notifications into your application. The use of type parameters `<Notification[], null>` ensures type safety and clear expectations for the query's response.
