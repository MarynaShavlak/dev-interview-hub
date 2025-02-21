# SidebarRedesigned

## Overview
The `SidebarRedesigned` component provides a modern sidebar navigation with a redesigned layout. It supports collapsible functionality and includes enhanced visual elements such as a customizable logo and a responsive collapse button. The component also integrates essential features like theme and language switchers to improve user experience.

## Type Definition
```typescript
interface SidebarRedesignedProps{
    className?: string;
}
```

## Props
The **`SidebarRedesigned`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |

## Features

1. **Collapsible Sidebar**: Utilizes the `useSidebarCollapse` hook to toggle between collapsed and expanded states, adapting the layout to different screen sizes and user preferences.
2. **Modern Layout**: Incorporates the `AppLogo` component and an enhanced collapse button with an `ArrowIcon`, providing a sleek and updated design.
3. **Dynamic Navigation Items**: Uses the `useSidebarItems` hook to dynamically generate a list of sidebar items, ensuring that the sidebar content remains current and relevant.
4. **Integrated Switchers**: Includes `ThemeSwitcher` and `LangSwitcher` components to facilitate easy access to theme and language settings, enhancing user customization.

## Usage Example
```typescript jsx
import { memo } from 'react';
import { SidebarRedesigned } from './SidebarRedesigned/SidebarRedesigned';
import { SidebarDeprecated} from './SidebarDeprecated/SidebarDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<SidebarRedesigned className={className} />}
            off={<SidebarDeprecated className={className} />}
        />
    );
});
```
## Conclusion
The `SidebarRedesigned` component offers an updated and flexible navigation solution with modern design elements. Its collapsible functionality, dynamic content rendering, and integrated switchers provide a user-friendly and adaptable sidebar experience. The component’s customizable styling options ensure seamless integration into diverse design frameworks.
