# Feature AvatarDropdown Documentation

## Overview

The `AvatarDropdown` module provides a dropdown menu that integrates user-related actions with an avatar. This component adapts its design and functionality based on the user’s role and authentication status, ensuring a personalized and context-sensitive user experience. It seamlessly integrates with the app's authentication and design systems, providing role-based access to different user actions such as profile management and logging out.

## Module Structure

The `AvatarDropdown` module is organized into two primary components: the UI for rendering the avatar and dropdown menu, and the module’s entry point.

```text
AvatarDropdown/
├── ui/
│   └── AvatarDropdown/
│       ├── AvatarDropdown.module.scss
│       └── AvatarDropdown.tsx
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`AvatarDropdown/`**:
    - [**AvatarDropdown.tsx**](./ui/AvatarDropdown/README.md): Main component that renders the avatar along with a dropdown menu. The menu items vary based on the user’s role and authentication state, allowing access to profile, settings, and admin actions.
    - **AvatarDropdown.module.scss**: Styles for the `AvatarDropdown` component.
### 2. `index.ts`
- Entry point for the `AvatarDropdowns` module, exporting the dropdown component for easy use throughout the application.

## Public API
- **Components**:
    - `AvatarDropdown`: A dropdown with avatar menu component that displays various user-related actions. The menu adapts its content based on user roles and the app's feature set, providing access to profile management, settings, and a logout option

## Conclusion
The `AvatarDropdown`module provides an essential UI element for managing user-specific actions. By integrating role-based functionality and adapting to different design systems, it ensures a smooth and personalized user experience. The component’s flexibility and ease of use make it an important feature in any application requiring user interaction.
