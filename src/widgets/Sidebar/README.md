# Widget Sidebar Documentation

## Overview

The `Sidebar` module provides a dynamic and versatile navigation solution for applications, adapting its interface based on the current design preferences. By leveraging feature flags, it offers both modern and legacy sidebar options, enhancing user experience and ensuring consistency with the overall design system.

## Module Structure
The `Sidebar` module is organized into several subdirectories, each playing a unique role managing navigation functionality.

```text
Sidebar/
├── model/
│   ├── types/
│   │   └── sidebar.ts
├── ui/
│   ├── SidebarItem/
│   │   ├── SidebarItem.tsx
│   │   └── SidebarItem.module.scss
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── DeprecatedSidebar/
│   │   │   ├── DeprecatedSidebar.module.scss
│   │   │   └── DeprecatedSidebar.tsx
│   │   └── RedesignedSidebar/
│   │       ├── RedesignedSidebar.module.scss
│   │       └── RedesignedSidebar.tsx
├── lib/
│   └── hooks/
│       ├── useSidebarCollapse/
│       │   └── useSidebarCollapse.ts
│       └── useSidebarItems/
│           └── useSidebarItems.tsx
└── index.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures

- **`types/`**
    - [**sidebar.ts**](./model/types/sidebar.ts): Interface representing an item in the sidebar navigation.

### 2. `ui/`: UI components

- **`Sidebar/`**
    - [**Sidebar.tsx**](./ui/Sidebar/README.md): Main component that dynamically switches between the `RedesignedSidebar` and `DeprecatedSidebar` based on the `isAppRedesigned` feature flag, enhancing the navigation experience according to the application's design preferences.
    - **`DeprecatedSidebar/`**:
      - [**DeprecatedSidebar.tsx**](./ui/Sidebar/DeprecatedSidebar/README.md): Legacy sidebar component.
    - **`RedesignedSidebar/`**:
      -  [**RedesignedSidebar.tsx**](./ui/Sidebar/RedesignedSidebar/README.md): Updated sidebar component for the redesigned UI.

- **`SidebarItem`**:
    - [**SidebarItem.tsx**](./ui/SidebarHeader/README.md): Component representing individual items within the sidebar, ensuring consistency and ease of navigation.
    - **SidebarItem.module.scss**: Styles for `SidebarItem` component.

### 3. `lib/`:  Utility functions and hooks.
- **`hooks/`**
  - **`useSidebarCollapse/`**
      - [**useSidebarCollapse.ts**](./lib/hooks/useSidebarCollapse/README.md):  Hook for managing the collapsed state of a sidebar.
  - **`useSidebarItems/`**
      - [**useSidebarItems.tsx**](./lib/hooks/useSidebarItems/README.md):  Hook for managing sidebar items based on user authentication and feature toggles.

### 4. `index.ts`
- Entry point for the `Sidebar` module, exporting main `Sidebar` component. 

## Public API
- **Components**:
    - `Sidebar`: Component that dynamically switches between the modern `RedesignedSidebar` and the legacy `DeprecatedSidebar`, ensuring alignment with the application's design preferences and enhancing user navigation experience.

## Conclusion
The `Sidebar` module serves as a comprehensive navigation solution that enhances the overall user experience through its well-structured architecture and versatile components. 
By integrating both the `RedesignedSidebar` and `DeprecatedSidebar`, the module adapts seamlessly to current design preferences, ensuring that users always interact with an interface that feels intuitive and modern. 
The inclusion of hooks like `useSidebarCollapse` and `useSidebarItems` further enriches the module, providing essential functionality for managing the sidebar's collapsed state and dynamically generating navigation items based on user authentication and feature toggles. 
This cohesive structure, combining components and hooks, empowers the `Sidebar` module to deliver a consistent, responsive, and user-friendly navigation experience that aligns perfectly with the application's design goals.
