# Entity Comment  Documentation

## Overview
The `Comment` module is responsible for handling all comment-related functionalities in the React application. This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. 
The following documentation provides an in-depth look at each part of the `Comment` module.

## Module Structure

The `Comment` module is organized into several directories, each serving a specific purpose:
```text
Comment/
├── model/
│   └── types/
│       └── comment.ts
├── ui/
│   └── CommentCard/
│       ├── CommentCardSkeleton/
│       │   ├── CommentCardSkeleton.tsx
│       ├── DeprecatedCommentCard/
│       │   ├── DeprecatedCommentCard.tsx
│       ├── RedesignedCommentCard/
│       │   ├── RedesignedCommentCard.tsx
│       ├── CommentCard.module.scss
│       ├── CommentCard.tsx
│   └── CommentList/
│       ├── CommentListSkeleton.tsx
│       ├── CommentList.tsx
├── index.ts
├── testing.ts
```

## Detailed Description

### 1. `model/`: Encapsulates the core logic and data structures of the Comment

#### 1.1. `types/`
- **comment.ts**: Contains TypeScript type definitions for the Comment module, defining the structure of a comment.

### 2. `ui/`: Contains the UI components related to the Comment module.

#### 2.1. `CommentCard/`: Manages the display of individual comments
- **`CommentCardSkeleton`**: A skeleton component used for loading states of the CommentCard
- **`DeprecatedCommentCard`**: The deprecated version of the CommentCard component.
- **`RedesignedCommentCard`**: The redesigned version of the CommentCard component.
- **`CommentCard.module.scss`**: SCSS module containing styles for the CommentCard component.
- **`CommentCard`**: The main CommentCard component.

#### 2.2. `CommentList/`: Manages the display of a list of comments.
- **`CommentListSkeleton`**: A skeleton component used for loading states of the CommentList.
- **`CommentList`**: The main CommentList component.

### 3. `index.ts`

Entry point for the Comment module, exporting the necessary component and type.

### 4. `testing.ts`

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
    - `addCommentFormReducer` - Reducer for add comment form state management for use in testing scenarios and development tools.

## Conclusion
The Entity `Comment` is designed to handle all comment-related functionalities in a structured and maintainable manner. By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
