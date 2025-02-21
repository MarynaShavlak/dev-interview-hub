# DeprecatedSidebar

## Overview
The `DeprecatedSidebar` component provides a sidebar navigation for applications with a deprecated design system. It supports collapsible functionality and includes essential elements such as theme and language switchers. The sidebar also dynamically renders a list of navigation items using hooks for managing items and collapse state.

## Type Definition
```typescript
interface DeprecatedSidebarProps{
    className?: string;
}
```

## Props
The **`DeprecatedSidebar`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features

1. **Collapsible Sidebar**: Utilizes the `useSidebarCollapse` hook to toggle between collapsed and expanded states, enhancing the component's usability in different screen sizes.
2. **Dynamic Navigation Items**: Uses the `useSidebarItems` hook to dynamically generate a list of sidebar items, ensuring that the sidebar content is always up-to-date.
3. **Integrated Switchers**: Includes `ThemeSwitcher` and `LangSwitcher` components to provide easy access to theme and language settings, contributing to a better user experience.


## Usage Example
```typescript jsx
import { memo } from 'react';
import { RedesignedSidebar } from './RedesignedSidebar/RedesignedSidebar';
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedSidebar className={className} />}
            off={<DeprecatedSidebar className={className} />}
        />
    );
});
```
## Conclusion
The `DeprecatedSidebar` component serves as a navigation aid for applications using an older design system. By incorporating collapsible functionality, dynamic navigation items, and integrated theme and language switchers, it ensures that users have an efficient and customizable navigation experience. The component’s flexibility and ease of integration make it a valuable part of the application's UI framework.

