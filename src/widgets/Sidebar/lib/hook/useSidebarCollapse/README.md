# `useSidebarCollapse` Hook

A custom React hook designed to manage the collapsed state of a sidebar. It provides functionality to toggle the collapse state and ensures the sidebar’s visibility is correctly managed based on the current state.

## Parameters

- **`initialState`** (optional): A boolean flag indicating the initial collapsed state of the sidebar. Defaults to `false`. Determines if the sidebar is collapsed or expanded when first rendered.

## Returns

An object with the following properties:
- **`collapsed`**: A boolean indicating whether the sidebar is currently collapsed. This reflects the current state of the sidebar’s visibility.
- **`toggleCollapse`**: A function that toggles the sidebar’s collapsed state between expanded and collapsed.

## Internal Behavior

1. **State Management**:
    - **`collapsed`**: Indicates if the sidebar is currently collapsed. Initially set to the `initialState` value and toggled between `true` and `false` using the `toggleCollapse` function.

2. **Callbacks**:
    - **`toggleCollapse`**: Toggles the `collapsed` state between `true` and `false`. It’s used to expand or collapse the sidebar when called.

## Usage Example

```typescript jsx
import React from 'react';
import { useSidebarCollapse } from './useSidebarCollapse';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { RedesignedSidebar } from './RedesignedSidebar/RedesignedSidebar';
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const { collapsed, toggleCollapse } = useSidebarCollapse();
    const sidebarItemsList = [ /* Your sidebar items here */ ];

    const itemsList = sidebarItemsList.map(item => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
    ));

    const commonProps = {
        className,
        collapsed,
        onToggle: toggleCollapse,
        itemsList,
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedSidebar {...commonProps} />}
            off={<DeprecatedSidebar {...commonProps} />}
        />
    );
};
```

## Conclusion
The `useSidebarCollapse` hook simplifies the management of the sidebar’s collapse state. It uses a single piece of state to determine whether the sidebar is collapsed and provides a function to toggle this state. This hook helps to maintain clean and readable code in the component by encapsulating the collapse logic and state management.
