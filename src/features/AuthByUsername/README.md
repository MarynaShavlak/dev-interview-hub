# Feature AuthByUsername  Documentation

## Overview

The `AuthByUsername` module is responsible for handling user authentication via a username and password. It follows the Feature-Sliced Design (FSD) architecture, which organizes the module into distinct layers for business logic, UI components, and state management. The module includes functionality for managing login states, user input validation, and error handling, while providing adaptable UI components for both legacy and redesigned application interfaces. It leverages Redux for state management and supports feature flags to ensure compatibility with different versions of the application UI.

## Module Structure
The `AuthByUsername` module is organized into several subdirectories, each playing a unique role in managing the authentication process.
```text
AuthByUsername/
├── model/
│   ├── types/
│   │   └── loginSchema.ts
│   ├── selectors/
│   │   ├── getLoginError/
│   │   │   └── getLoginError.ts
│   │   ├── getLoginIsLoading/
│   │   │   └── getLoginIsLoading.ts
│   │   ├── getLoginPassword/
│   │   │   └── getLoginPassword.ts
│   │   └── getLoginEmail/
│   │       └── getLoginEmail.ts
│   ├── services/
│   │   └── loginByUsername/
│   │       └── loginByUsername.ts
│   └── slices/
│       └── loginSlice.ts
├── ui/
│   ├── AuthForm/
│   │   ├── DeprecatedAuthForm/
│   │   │   └── DeprecatedAuthForm.tsx
│   │   ├── RedesignedAuthForm/
│   │   │   └── RedesignedAuthForm.tsx
│   │   ├── AuthForm.module.scss
│   │   └── AuthForm.tsx
│   └── AuthModal/
│       └── AuthModal.tsx
├── lib/
│   └── hooks/
│       └── useSignInForm.ts
├── index.ts
└── testing.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures

- **`selectors/`**
  - **`getLoginError/`**
    - [**getLoginError.ts**](./model/selectors/getLoginError/README.md):  Fetches login error.
  - **`getLoginIsLoading/`**
    - [**getLoginIsLoading.ts**](./model/selectors/getLoginIsLoading/README.md):  Indicates if login is in progress.
  - **`getLoginPassword/`**
    - [**getLoginPassword.ts**](./model/selectors/getLoginPassword/README.md):   Retrieves the password.
  - **`getLoginEmail/`**
    - [**getLoginEmail.ts**](model/selectors/getLoginEmail/README.md):  Retrieves the username.
    
- **`services/`**
  - **`loginByUsername/`**
    - [**loginByUsername.ts**](./model/services/loginByUsername/README.md): Manages the login API request.

- **`slices/`**
  - [**loginSlice.ts**](model/slices/loginSlice/README.md):Defines the Redux slice for managing login-related state, including actions and reducers.

- **`types/`**
  - [**loginSchema.ts**](./model/types/loginSchema.ts): Schema for login form.

### 2. `ui/`: UI components

- **`AuthForm/`**
  - [**AuthForm.tsx**](ui/AuthForm/README.md): Main login form component that handles user input and submission for authentication.
  - **AuthForm.module.scss**: Styles for the `AuthForm` component.
  - **`DeprecatedAuthForm/`**
    - [**DeprecatedAuthForm.tsx**](ui/AuthForm/DeprecatedAuthForm/README.md): Legacy version of the login form used in the older UI design.
  - **`RedesignedAuthForm/`**
    - [**RedesignedAuthForm.tsx**](ui/AuthForm/RedesignedAuthForm/README.md): Updated login form that aligns with the redesigned UI.

- **`AuthModal/`**
  - [**AuthModal.tsx**](ui/AuthModal/README.md): Modal component that displays the `AuthForm` within a popup window for a focused user experience..
  
### 3. `lib/`:  Utility functions and hooks.
- **`hook/`**
  - [**useSignInForm.ts**](lib/hooks/useSignInForm/README.md):  Custom hook for managing form logic and state.


### 4. `index.ts`
- Entry point for the AuthByUsername module, exporting components, functions, and types.

### 5. `testing.ts`

Entry point for testing-related functionalities within the AuthByUsername module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.


## Public API

- **Types**:
    - `LoginSchema`: Schema defining the state of the login form.

- **Components**:
    - `AuthModal`: Component for modal dialog for user authentication.

## Public Testing API
- **Testing Exports**:
    - `loginReducer` - Reducer for login operation for use in testing scenarios and development tools.

## Conclusion
The `AuthByUsername` module provides a comprehensive solution for managing user authentication via username and password. By following the Feature-Sliced Design (FSD) approach, it ensures modularity, scalability, and maintainability. The module includes core logic for handling authentication requests, selectors for accessing login-related state, and UI components for both legacy and redesigned login forms. The use of Redux for state management and custom hooks for form handling further enhances its flexibility and ease of integration. With support for modern UI design patterns and optimized performance, this module offers a robust and adaptable solution for user authentication.
