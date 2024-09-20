# Entity User Documentation

## Overview
The User module is responsible for handling all user-related functionalities in  React application. 
This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. 
following documentation provides an in-depth look at each part of the `User` module.


## Module Structure

The `User` module is organized into several directories, each serving a specific purpose:
```text
User/
├── api/
│   └── userApi.ts
├── model/
│   ├── consts/
│   │   └── consts.ts
│   ├── selectors/
│   │   ├── getUserAuthData/
│   │   │   └── getUserAuthData.ts
│   │   ├── getUserInited/
│   │   │   └── getUserInited.ts
│   │   ├── getJsonSettings/
│   │   │   └── getJsonSettings.ts
│   │   ├── roles/
│   │   │    └── roleSelectors.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── initAuthData/
│   │   │   └── initAuthData.ts
│   │   ├── logoutUser/
│   │   │   └── logoutUser.ts
│   │   ├── saveJsonSettings/
│   │   │   └── saveJsonSettings.ts
│   └── slices/
│       └── userSlice.ts
│   ├── types/
│       ├── jsonSettings.ts
│       └── user.ts
├── lib/
│   ├── userUtils/
│   │   └── userUtils.ts
├── index.ts
├── testing.ts
```

## Detailed Description

### 1. `api/`: API interface
- [**userApi.ts**](./api/README.md): This file defines the API calls related to user operations such as setJsonSettings, getUserDataById.

### 2. `model/`: Core logic and data structures

#### 2.1. `consts/`
- [**consts.ts**](./model/consts/consts.ts): Contains constant values used across the User module, such as UserRoles.

#### 2.2.`selectors/`: Includes selector functions used to extract specific pieces of state from the Redux store.

- **getUserAuthData/**
    - [**getUserAuthData.ts**](./model/selectors/getUserAuthData/README.md): Selector to get user authentication data from the state.
- **getUserInited/**
    - [**getUserInited.ts**](./model/selectors/getUserInited/README.md): Selector to check if the user initialization process is complete.
- **getJsonSettings/**
    - [**getJsonSettings.ts**](./model/selectors/getJsonSettings/getJsonSettings.ts): Selector to retrieve user-specific JSON settings.
- **roles/**
    - [**roleSelectors.ts**](./model/selectors/roles/README.md): Selector related to user roles.
- **index.ts**
    - Entry point for the selectors, exporting the necessary selectors.
#### 2.3. `services/`: Contains service functionalities related to user data management:

- **initAuthData/**
    - [**initAuthData.ts**](./model/services/initAuthData/README.md): Service to initialize user authentication data.
- **saveJsonSettings/**
    - [**saveJsonSettings.ts**](./model/services/saveJsonSettings/README.md): Service to save user-specific JSON settings.
- **logout/**
  - [**logout.ts**](./model/services/logoutUser/README.md): Service to handle additional server-side logout processes if required.

#### 2.4. `slices/`: Contains the Redux slice for managing user state.

- [**userSlice.ts**](./model/slices/README.md): Defines the Redux slice, including actions, reducers  and extra reducers for managing user state.

#### 2.5. `types/`: Contains TypeScript type definitions for the User module.

- [**jsonSettings.ts**](./model/types/jsonSettings.ts): Defines types for JSON settings related to the user.
- [**user.ts**](./model/types/user.ts): Defines the User and UserSchema interfaces .

### 3. `lib/`: Utility functions and hooks.
- **userUtils/**
  - [**userUtils.ts**](./lib/userUtils/userUtils.ts): Utility functions for initializing user features and updating localstorage with user info.
  
### 4. `index.ts`

Entry point for the User module, exporting the necessary components, functions, and types.

### 5. `testing.ts`
Entry point for testing-related functionalities within the Profile module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.


## Public API 

- **Types**: 
  - `UserSchema` -  An interface that defines the structure of the user schema.
  - `User` - An interface that defines the structure of a user object. 
- **Constants**:
  - `UserRole` -  Enum representing user roles.
- **Selectors**:
  - `getUserAuthData`, `useUserAuthData`: Retrieve authenticated user data.
  - `getUserInited`, `useUserInited`: Check if user data is initialized.
  - `useUserRoles`: Get user roles.
  - `isUserAdmin`, `isUserManager`: Check if the user has admin or manager roles.
  - `useJsonSettings`: Retrieve user JSON settings.
- **Actions**:
  - `userReducer`: Reducer for user state management.
  - `userActions`, `useUserActions`: User-related actions for dispatching.
- **Services**:
  - `logoutUser`: Thunk to log out the user.
- **Utilities**:
  - `handleUserAuthentication`: Function for handling Handles user authentication by initializing user features and storing user ID in local storage.

## Public Testing API
- **Testing Exports**:
  - `testUserData` -  is a mock object representing user data, designed for use in testing scenarios and development tools.


## Conclusion
The Entity `User` module is designed to handle all user-related functionalities in a structured and maintainable manner. 
By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
