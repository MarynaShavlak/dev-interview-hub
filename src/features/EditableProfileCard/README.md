# Feature EditableProfileCard  Documentation

## Overview

The `EditableProfileCard` module provides a flexible and user-friendly interface for users to view and edit their profile information. This module is designed using the Feature-Sliced Design (FSD) approach, ensuring modularity and maintainability. It includes functionalities for fetching user data, updating profile information, and validating user input. The module is fully integrated with Redux for state management and provides a robust user experience with error handling and loading states.

## Module Structure

The `EditableProfileCard` module is organized into several subdirectories, each playing a unique role in managing user profiles.

```text
EditableProfileCard/
├── model/
│   ├── types/
│   │   └── EditableProfileCardSchema.ts
│   ├── consts/
│   │   └── consts.ts
│   ├── selectors/
│   │   ├── getProfileData/
│   │   │   └── getProfileData.ts
│   │   ├── getProfileError/
│   │   │   └── getProfileError.ts
│   │   ├── getProfileForm/
│   │   │   └── getProfileForm.ts
│   │   ├── getProfileReadonly/
│   │   │   └── getProfileReadonly.ts
│   │   ├── getProfileValidateErrors/
│   │   │   └── getProfileValidateErrors.ts
│   │   └── getProfileIsLoading/
│   │       └── getProfileIsLoading.ts
│   ├── services/
│   │   ├── updateProfileData/
│   │   │   └── updateProfileData.ts
│   │   ├── validateProfileData/
│   │   │   └── validateProfileData.ts
│   │   └── fetchProfileData/
│   │       └── fetchProfileData.ts
│   └── slices/
│       └── profileSlice.ts
├── ui/
│   ├── EditableProfileCard/
│   │   ├── EditableProfileCard.tsx
│   │   └── EditableProfileCard.module.scss
│   ├── EditableProfileCardContainer/
│   │   └── EditableProfileCardContainer.tsx
│   ├── EditableProfileCardError/
│   │   └── EditableProfileCardError.tsx
│   ├── EditableProfileCardHeader/
│   │   ├── EditableProfileCardHeader.tsx
│   │   ├── EditableProfileCardHeader.module.scss
│   │   ├── EditableProfileCardHeaderDeprecated/
│   │   │   └── EditableProfileCardHeaderDeprecated.tsx
│   │   └── EditableProfileCardHeaderRedesigned/
│   │       └── EditableProfileCardHeaderRedesigned.tsx
├── lib/
│   └── hooks/
│       └── useProfile.ts
├── index.ts
└── testing.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures 

- **`selectors/`**
    - **`getProfileData/`**
        - [**getProfileData.ts**](./model/selectors/getProfileData/README.md):  Retrieves the user's profile data from the Redux store.
    - **`getProfileError/`**
        - [**getProfileError.ts**](./model/selectors/getProfileError/README.md):  Fetches any error messages related to profile operations.
    - **`getProfileForm/`**
        - [**getProfileForm.ts**](./model/selectors/getProfileForm/README.md):   Provides the current form state for editing.
    - **`getProfileReadonly/`**
        - [**getProfileReadonly.ts**](./model/selectors/getProfileReadonly/README.md):   Indicates whether the profile is in read-only mode.
    - **`getProfileValidateErrors/`**
        - [**getProfileValidateErrors.ts**](./model/selectors/getProfileValidateErrors/README.md):  Gets validation errors for the profile form.
    - **`getProfileIsLoading/`**
        - [**getProfileIsLoading.ts**](./model/selectors/getProfileIsLoading/README.md): Checks if the profile data is currently being loaded.
- **`services/`**
    - **`fetchProfileData/`**
        - [**fetchProfileData.ts**](./model/services/fetchProfileData/README.md): Fetches the user's profile data from the server.
    - **`updateProfileData/`**
        - [**updateProfileData.ts**](model/services/updateUserProfileThunk/README.md): Handles the API request to update user profile information.
    - **`validateProfileData/`**
        - [**validateProfileData.ts**](./model/services/validateProfileData/README.md): Validates the user input for profile updates.
- **`slices/`**
    - [**profileSlice.ts**](model/slices/README.md):Manages the Redux state for the profile, including actions and reducers for updating and fetching profile data.
- **`types/`**
    - [**EditableProfileCardSchema.ts**](./model/types/editableProfileCardSchema.ts): Defines the schema for the profile data
- **`consts/`**
    - [**consts.ts**](./model/consts/README.md): Defines const for profile card states and configurations.

### 2. `ui/`: UI components 

- **`EditableProfileCard/`**
    - [**EditableProfileCard.tsx**](./ui/EditableProfileCard/README.md): Main component that displays the user's profile information and allows for edits.
    - **EditableProfileCard.module.scss**: Styles for the `EditableProfileCard` component.
- **`EditableProfileCardContainer/`**
    - [**EditableProfileCardContainer.tsx**](./ui/EditableProfileCardContainer/README.md): Container component that connects the EditableProfileCard to the Redux store.
- **`EditableProfileCardError/`**
    - [**EditableProfileCardError.tsx**](./ui/EditableProfileCardError/README.md): Component that displays error messages related to profile operations.
- **`EditableProfileCardHeader/`**:
    - [**EditableProfileCardHeader.tsx**](./ui/EditableProfileCardHeader/README.md): Header component for the editable profile card
    - **EditableProfileCardHeader.module.scss**: Styles for the header.
    - **`EditableProfileCardHeaderDeprecated/`**:
      - [**EditableProfileCardHeaderDeprecated.tsx**](ui/EditableProfileCardHeader/EditableProfileCardHeaderDeprecated/README.md): Legacy header component.
    - **`EditableProfileCardHeaderRedesigned/`**:
      -  [**EditableProfileCardHeaderRedesigned.tsx**](ui/EditableProfileCardHeader/EditableProfileCardHeaderRedesigned/README.md): Updated header component for the redesigned UI.

### 3. `lib/`:  Utility functions and hooks.
- **`hook/`**
    - [**useProfile.ts**](lib/hooks/useProfile/README.md):  Custom hook for managing the profile form state and interactions.
### 4. `index.ts`
- Entry point for the `EditableProfileCard` module, exporting components, functions, and types.

### 5. `testing.ts`

Entry point for testing-related functionalities within the Article module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.


## Public API

- **Types**:
    - `ProfileSchema`: Schema defining the state of the profile.
- **Components**:
    - `EditableProfileCard`: Component for displaying and editing user profile information.
- **Selectors**:
    - `getUserAuthData`: Selector for retrieving authenticated user data.
    - 
## Public Testing API
- **Testing Exports**:
    - `profileReducer` - Reducer for operations with profile for use in testing scenarios and development tools.

## Conclusion
The `EditableProfileCard` module offers a comprehensive solution for managing user profile data in a user-friendly manner. With its well-structured architecture, it facilitates efficient data fetching, validation, and updating processes. The integration with Redux for state management, along with robust UI components and utilities, ensures a smooth user experience. This module can easily adapt to different UI designs, making it a versatile addition to any application.
