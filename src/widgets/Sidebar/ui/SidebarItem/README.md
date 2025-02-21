# SidebarItem

## Overview
The `SidebarItem` component renders a single item in the sidebar, dynamically switching between redesigned and deprecated versions based on the `isAppRedesigned` feature flag. This approach ensures that the sidebar adapts to different design paradigms while providing a consistent user experience. The component conditionally displays items based on user authentication status and supports both modern and legacy UI designs.
The component also supports a collapsed state, where item text is hidden to save space, and an active state, which visually highlights the currently selected item.

## Type Definition
```typescript
export interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
}
```

## Props

The **`SidebarItem`** component accepts the following props:

| Prop              | Type                                  | Required / Optional | Description                                                  |
|-------------------|---------------------------------------|----------------------|--------------------------------------------------------------|
| `item`       | `SidebarItemType`                              | Required            | The sidebar item object containing path, icon, and text.                |
| `collapsed`          | `boolean`                              | Optional              | A flag indicating whether the sidebar is collapsed.                                  |


## Functionality

1. **Feature Flag Driven**:
    - The component adapts between the `SidebarItemRedesigned` and `SidebarDeprecatedItem` interfaces based on the `isAppRedesigned` feature flag. This allows the sidebar to provide either a modern or legacy UI, depending on the application's configuration.

2. **Conditional Rendering**:
    - Sidebar items with the `authOnly` flag are rendered only if the user is authenticated. This ensures that items requiring authentication are hidden from unauthenticated users, maintaining security and relevance.

3. **Dynamic Icons and Text**:
    - The component uses the `item` prop to dynamically set the icon and text for each sidebar item. This allows for flexible and customizable sidebar content based on the provided `SidebarItemType`.

4. **Collapsed State**:
    - When `collapsed` is set to `true`, the component hides the item text, displaying only the icon. This feature is useful for a compact sidebar design, where space is limited and a more minimalistic view is preferred.
    - CSS classes handle the visual changes in the collapsed state:
        - `.collapsed` hides the text and adjusts the item width for the deprecated version.
        - `.collapsedRedesigned` achieves similar effects for the redesigned version.

5. **Active State**:
    - The component visually highlights the currently active item using a gradient background and a vertical accent line. This is achieved through CSS styles that apply a background gradient and a left border line to indicate the selected item.
    - The active state enhances navigation by clearly showing which sidebar item is currently selected, improving user interaction and experience.

## Usage Example
```typescript jsx
import React, { memo } from 'react';
import { SidebarItem, useSidebarItems  } from '@/widgets/Sidebar';

const Sidebar = () => {
    const sidebarItems = useSidebarItems();

    return (
        <nav>
            <ul>
                {sidebarItems.map((item) => (
                    <li key={item.path}>
                        <SidebarItem item={item} collapsed={false} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Sidebar;
```

## Conclusion
The `SidebarItem` component is integral to the sidebar's dynamic rendering, providing a flexible and adaptive user interface based on the `isAppRedesigned` feature flag. 
It ensures that users receive the appropriate design version of the sidebar items, supporting both modern and legacy styles. 
The component also manages the collapsed and active states to enhance usability: the collapsed state allows for a compact design, while the active state highlights the selected item, improving navigation and user experience. 
By conditionally rendering items based on authentication status and adapting to different design paradigms, the `SidebarItem` component contributes to a consistent and user-friendly sidebar experience.
