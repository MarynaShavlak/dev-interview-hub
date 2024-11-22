# Entity Profile Documentation

## Overview
The `Profile`  module is responsible for handling all profile-related functionalities in the React application. This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. The following documentation provides an in-depth look at each part of the `Profile` module.

## Module Structure
The `Profile` module is organized into several directories, each serving a specific purpose:
```text
Profile/
├── model/
│   └── types/
│       └── profile.ts
├── ui/
│   └── DeprecatedUserCard/
│   │   ├── DeprecatedUserCardError/
│   │   ├── DeprecatedUserCardLoader/
│   │   ├── DeprecatedUserCard.module.scss
│   │   ├── DeprecatedUserCard.tsx
│   │   └── README.md
│   └── UserCard/
│   │   ├── UserCard.tsx
│   └── RedesignedUserCard/
│   │   ├── RedesignedUserCardError/
│   │   ├── RedesignedUserCardSkeleton/
│   │   ├── RedesignedUserCard.module.scss
│   │   ├── RedesignedUserCard.tsx
├── index.ts
├── testing.ts
```

## Detailed Description

### 1. `model/`: Core logic and data structures

#### 1.1. `types/`
- [**profile.ts**](./model/types/profile.ts): Contains TypeScript type definitions for the Profile module, defining the structure of a profile object. This ensures type safety and consistency throughout the application.

### 2. `ui/`: UI components

#### 2.1. `UserCard/`: Manages the display and interaction of the profile card UI.
- [**UserCard.tsx**](../User/ui/UserCard/README.md): The main `UserCard` component, responsible for rendering the profile card.

#### 2.2. `DeprecatedUserCard/`: Manages the display and interaction of the deprecated profile card UI.
- **`DeprecatedUserCard.module.scss`**: Contains the styles specific to the `DeprecatedUserCard` component.
- [**DeprecatedUserCard.tsx**](../User/ui/DeprecatedUserCard/README.md): The main `DeprecatedUserCard` component, responsible for rendering the deprecated profile card.
- [**DeprecatedUserCardError**](../User/ui/DeprecatedUserCard/DeprecatedUserCardError/README.md): Handles the display of errors in the deprecated profile card.
- [**DeprecatedUserCardLoader**](../User/ui/DeprecatedUserCard/DeprecatedUserCardLoader/README.md): Manages the loading state of the deprecated profile card.

#### 2.3. `RedesignedUserCard/`: Manages the display and interaction of the redesigned profile card UI.
- **`RedesignedUserCard.module.scss`**: Contains the styles specific to the `RedesignedUserCard` component.
- [**RedesignedUserCard.tsx**](../User/ui/RedesignedUserCard/README.md): The main `RedesignedUserCard` component, responsible for rendering the redesigned profile card.
- [**RedesignedUserCardError**](../User/ui/RedesignedUserCard/RedesignedUserCardError/README.md): Handles the display of errors in the redesigned profile card.
- [**RedesignedUserCardSkeleton**](../User/ui/RedesignedUserCard/RedesignedUserCardSkeleton/README.md): Manages the loading state of the redesigned profile card.

### 3. `index.ts`
- **`index.ts`**: Entry point for the Profile module, exporting the necessary components and types for use in the application.

### 4. `testing.ts`
Entry point for testing-related functionalities within the Profile module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.

## Public API

- **Types**:
    - `Profile` - An interface defining the structure of a user profile object.

- **Components**:
    - `UserCard` - A component for displaying and editing user profile information.
    - `RedesignedUserCardSkeleton` - A skeleton loading screen for the redesigned profile card.

## Public Testing API
- **Testing Exports**:
  - `testProfileData` -  is a mock object representing profile data, designed for use in testing scenarios and development tools.

## Conclusion
The Entity `Profile` is designed to handle all profile-related functionalities in a structured and maintainable manner. By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
