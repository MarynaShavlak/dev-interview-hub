# Entity Comment  Documentation

## Overview
The `Comment` module is responsible for handling all comment-related functionalities in the React application. This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. 
The following documentation provides an in-depth look at each part of the `Comment` module.

## Module Structure

The `Comment` module is organized into several directories, each serving a specific purpose:
```text
Comment/
├── model/
│   ├── types/
│   │   ├── comment.ts
│   │   └── addCommentForm.ts
│   ├── selectors/
│   │   └── addCommentFormSelectors.ts
├── ui/
│   ├── CommentCard/
│   │   ├── CommentCardSkeleton/
│   │   │   └── CommentCardSkeleton.tsx
│   │   ├── DeprecatedCommentCard/
│   │   │   └── DeprecatedCommentCard.tsx
│   │   ├── CommentCardRedesigned/
│   │   │   └── CommentCardRedesigned.tsx
│   │   ├── CommentCard.module.scss
│   │   └── CommentCard.tsx
│   ├── CommentList/
│   │   └── CommentList.tsx
│   ├── AddCommentForm/
│   │   ├── AddCommentForm.tsx
│   │   ├── DeprecatedAddCommentForm/
│   │   │   └── DeprecatedAddCommentForm.tsx
│   │   └── AddCommentFormRedesigned/
│   │       └── AddCommentFormRedesigned.tsx
├── lib/
│   ├── hook/
│   │   └── useAddCommentForm.ts
├── index.ts
└── testing.ts
```

## Detailed Description

### 1. `model/`: Core logic and data structures

#### 1.1. `types/`
- [**comment.ts**](./model/types/comment.ts): Contains TypeScript type definitions for the Comment module, defining the structure of a comment.
- [**addCommentForm.ts**](./model/types/comment.ts): Contains interface representing the state of the add comment form.

#### 1.2.`selectors/`
  - [**addCommentFormSelectors.ts**](./model/selectors/README.md): Contains selector functions to reto access and retrieve the text and error state of the add comment form from the Redux store.

#### 1.3. `slices/`
  - [**addCommentFormSlice.ts**](./model/slices/README.md): Manages to the state of a comment form in Redux, including actions and reducers.


### 2. `ui/`: UI components

#### 2.1. `CommentCard/`: Manages the display of individual comments.
- [**CommentCard.tsx**](./ui/CommentCard/README.md): The main `CommentCard` component.

- **`DeprecatedCommentCard/`**
  - [**DeprecatedCommentCard.tsx**](ui/CommentCard/CommentCardDeprecated/README.md): The deprecated version of the `CommentCard` component.

- **`CommentCardRedesigned/`**
  - [**CommentCardRedesigned.tsx**](ui/CommentCard/CommentCardRedesigned/README.md): The redesigned version of the `CommentCard` component.

- **`CommentCardSkeleton/`**
  - [**CommentCardSkeleton.tsx**](./ui/CommentCard/CommentCardSkeleton/README.md): A skeleton component used for loading states of the `CommentCard`.

- **CommentCard.module.scss**: SCSS module containing styles for the `CommentCard` component.

#### 2.2. `CommentList/`: Manages the display of a list of comments.
- [**CommentList.tsx**](./ui/CommentList/README.md): The main `CommentList` component.

#### 2.3. `AddCommentForm/`: Manages the display of form for adding new comments.
- [**AddCommentForm.tsx**](./ui/AddCommentForm/README.md): The main `AddCommentForm` component.
- **`DeprecatedCommentCard/`**
  - [**DeprecatedAddCommentForm.tsx**](ui/AddCommentForm/AddCommentFormDeprecated/README.md): The deprecated version of the `AddCommentForm` component.

- **`CommentCardRedesigned/`**
  - [**AddCommentFormRedesigned.tsx**](ui/AddCommentForm/AddCommentFormRedesigned/README.md): The redesigned version of the `AddCommentForm` component.


### 3. `lib/`: Utility functions and hooks.
- **`hook/`**
  - [**useAddCommentForm.ts**](./lib/hook/README.md): Hook for managing the add comment form state and actions.


### 4. `index.ts`

Entry point for the Comment module, exporting the necessary component and type.

### 5. `testing.ts`

Entry point for testing-related functionalities within the Comment module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.

## Public API

- **Types**:
    - `Comment` - An interface defining the structure of a comment object.
    - `AddCommentFormSchema` - An interface defining the schema for the add comment form.

- **Components**:
    - `CommentList` - A component for displaying a list of comments.
    - `AddCommentForm` - An asynchronous component for adding a new comment.


## Public Testing API
- **Testing Exports**:
    - `addCommentFormReducer` - Reducer for add comment form state management for use in testing scenarios and development tools.  - `testUserData` -  is a mock object representing user data, designed for use in testing scenarios and development tools.
    - `testCommentsData` -  is a mock array of objects representing comments data, designed for use in testing scenarios and development tools.
    - `testCommentData` -  is a mock object representing comment data, designed for use in testing scenarios and development tools.
    - `testCommentNoUserAvatarData` - is a mock object representing comment data with no info about user avatar, designed for use in testing scenarios and development tools.

## Conclusion
The Entity `Comment` is designed to handle all comment-related functionalities in a structured and maintainable manner. By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
