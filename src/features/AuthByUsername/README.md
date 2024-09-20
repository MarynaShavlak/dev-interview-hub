# Feature AuthByUsername  Documentation

## Overview


## Module Structure

The `AuthByUsername` module is organized into several subdirectories, each playing a unique role in handling comments for articles.

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
│   │   └── getLoginUsername/
│   │       └── getLoginUsername.ts
│   ├── services/
│   │   └── loginByUsername/
│   │       └── loginByUsername.ts
│   └── slices/
│       └── loginSlice.ts
├── ui/
│   ├── LoginForm/
│   │   ├── DeprecatedLoginForm/
│   │   │   └── DeprecatedLoginForm.tsx
│   │   ├── RedesignedLoginForm/
│   │   │   └── RedesignedLoginForm.tsx
│   │   ├── LoginForm.module.scss
│   │   └── LoginForm.tsx
│   └── LoginModal/
│       └── LoginModal.tsx
├── lib/
│   └── hooks/
│       └── useLoginForm.ts
├── index.ts
└── testing.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures for the AuthByUsername feature.

- **`selectors/`**
  - **`getLoginError/`**
    - [**getLoginError.ts**](./model/selectors/getLoginError/README.md):  Fetches login error.
  - **`getLoginIsLoading/`**
    - [**getLoginIsLoading.ts**](./model/selectors/getLoginIsLoading/README.md):  Indicates if login is in progress.
  - **`getLoginPassword/`**
    - [**getLoginPassword.ts**](./model/selectors/getLoginPassword/README.md):   Retrieves the password.
  - **`getLoginUsername/`**
    - [**getLoginUsername.ts**](./model/selectors/getLoginUsername/README.md):  Retrieves the username.
    
- **`services/`**
  - **`loginByUsername/`**
    - [**loginByUsername.ts**](./model/services/loginByUsername/README.md): Manages the login API request.

- **`slices/`**
  - [**loginSlice.ts**](model/slices/README.md):Defines the Redux slice for managing login-related state, including actions and reducers.

- **`types/`**
  - [**loginSchema.ts**](./model/types/loginSchema.ts): Schema for login form.

### 2. `ui/`: UI components related to the AuthByUsername module.

- **`LoginForm/`**
  - [**LoginForm.tsx**](./ui/LoginForm/README.md): Main login form component that handles user input and submission for authentication.
  - **LoginForm.module.scss**: Styles for the `LoginForm` component.
  - **`DeprecatedLoginForm/`**
    - [**DeprecatedLoginForm.tsx**](./ui/LoginForm/DeprecatedLoginForm/README.md): Legacy version of the login form used in the older UI design.
  - **`RedesignedLoginForm/`**
    - [**RedesignedLoginForm.tsx**](./ui/LoginForm/RedesignedLoginForm/README.md): Updated login form that aligns with the redesigned UI.

- **`LoginModal/`**
  - [**LoginModal.tsx**](./ui/LoginModal/README.md): Modal component that displays the `LoginForm` within a popup window for a focused user experience..
  
### 3. `lib/`:  Utility functions and hooks.
- **`hook/`**
  - [**useLoginForm.ts**](./lib/hooks/README.md):  Custom hook for managing form logic and state.


### 4. `index.ts`
- Entry point for the Article module, exporting components, functions, and types.

### 5. `testing.ts`

Entry point for testing-related functionalities within the Article module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.


## Public API

- **Types**:
    - `LoginSchema`: Schema defining the state of the login form.

- **Components**:
    - `LoginModal`: Component for modal dialog for user authentication.

## Public Testing API
- **Testing Exports**:
    - `loginReducer` - Reducer for login operation for use in testing scenarios and development tools.


## Conclusion
The `AuthByUsername` module provides a comprehensive solution for managing .... 
