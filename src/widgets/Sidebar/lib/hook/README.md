# useSidebarItems Hook

A custom React hook for managing and providing the sidebar items based on user authentication status and feature toggles. This hook generates a list of sidebar items with appropriate icons and paths, and includes conditional items for authenticated users.

## Parameters

This hook does not accept any parameters.

## Returns

An array of sidebar item objects, each with the following properties:

- `path: string` - The route path for the sidebar item.
- `Icon: React.ComponentType` - The icon component associated with the sidebar item. This is dynamically chosen based on feature toggles.
- `text: string` - The display text for the sidebar item.
- `authOnly: boolean` - (Optional) Indicates whether the sidebar item should only be visible to authenticated users.

## Internal Behavior

1. **User Authentication**:
    - The hook utilizes `useUserAuthData` to determine if the user is authenticated.
    - Based on authentication status, additional sidebar items are conditionally included.

2. **Feature Toggling**:
    - The `toggleFeatures` function is used to dynamically select the icon for each sidebar item based on the feature flag `isAppRedesigned`.

3. **Sidebar Items List**:
    - **Default Items**: Always included in the sidebar regardless of authentication status:
        - **Home**: Displays a home icon and links to the main route.
        - **About**: Displays an About icon and links to the About route.
    - **Authenticated Items**: Added if the user is authenticated:
        - **Profile**: Links to the user profile page with a profile icon.
        - **Articles**: Links to the articles page with an articles icon.

## Usage Example

```typescript jsx
import React from 'react';
import { useSidebarItems } from '@/shared/lib/hooks/useSidebarItems/useSidebarItems';

const Sidebar = () => {
    const sidebarItems = useSidebarItems();

    return (
        <nav>
            <ul>
                {sidebarItems.map((item) => (
                    <li key={item.path}>
                        <a href={item.path}>
                            <item.Icon />
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Sidebar;
```

## Conclusion
The `useSidebarItems` hook simplifies sidebar management by providing a dynamically generated list of sidebar items based on user authentication and feature toggles. It handles the conditional rendering of items and icons, making it easy to adapt the sidebar content to different application states and features.
