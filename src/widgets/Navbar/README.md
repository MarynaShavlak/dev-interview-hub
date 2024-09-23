# Widget Navbar  Documentation

## Overview

The `Navbar` widget is a core component of the application that provides a dynamic and responsive navigation bar. It adapts its layout and functionality based on user authentication status and is driven by feature flags to ensure consistency with both the redesigned and deprecated design systems. The Navbar component conditionally renders either an authenticated (`AuthorizedNavbar`) or unauthenticated (`NotAuthorizedNavbar`) version, enhancing the user experience by providing the appropriate navigation options.
## Module Structure

The `Navbar` module is organized into several subdirectories, each playing a unique role in managing user profiles.

```text
Navbar/
├── lib/
│   └── hooks/
│       └── useAuthModal.ts
├── ui/
│   ├── AuthorizedNavbar/
│   │   └── AuthorizedNavbar.tsx
│   ├── NotAuthorizedNavbar/
│   │   └── NotAuthorizedNavbar.tsx
│   ├── Navbar.tsx
│   └── Navbar.module.scss
└── index.ts
```
## Detailed Description

### 1. `ui/`: UI components

- **`Navbar/`**
    - [**Navbar.tsx**](./ui/Navbar/README.md): Main component responsible for rendering either the `AuthorizedNavbar` or `NotAuthorizedNavbar` based on the user's authentication status.
    - **Navbar.module.scss**: Styles for the `Navbar` component.
- **`AuthorizedNavbar`**
    - [**AuthorizedNavbar.tsx**](./ui/AuthorizedNavbar/README.md): Renders the navigation bar for authenticated users, providing key navigation elements.
- **`NotAuthorizedNavbar/`**
    - [**NotAuthorizedNavbar.tsx**](./ui/NotAuthorizedNavbar/README.md): Provides the navigation bar for unauthenticated users.

### 2. `lib/`:  Utility functions and hooks.
- **`hook/`**
    - [**useAuthModal.ts**](./lib/hooks/README.md):  Custom hook for managing  the state of the authentication modal. It provides the logic for showing or hiding the login modal based on user interactions, ensuring a seamless authentication process.
### 4. `index.ts`
- Entry point for the `Navbar` module, exporting the  component for easy use throughout the application.

## Public API
- **Components**:
    - `Navbar`: A main component that dynamically adapts its navigation options based on the user's authentication status, utilizing the useUserAuthData hook to display tailored options for authenticated users and a login interface for unauthenticated users.
## Conclusion
The `Navbar` widget module plays a critical role in providing a responsive and adaptable navigation experience. 
By dynamically rendering either the `AuthorizedNavbar` or `NotAuthorizedNavbar` based on the user's authentication status, it ensures that users are presented with the appropriate navigation options. 
The module's use of feature flags to switch between redesigned and deprecated styles guarantees a consistent and cohesive look and feel, regardless of the user's authentication state or the application's design phase.

Whether for authenticated users with access to article creation, notifications, and user account settings, or for unauthenticated users with a simple login interface, the `Navbar` widget ensures seamless navigation throughout the application. Its integration with hooks like `useAuthModal` further enhances its functionality, making it a versatile and essential component in the application's user experience architecture.
