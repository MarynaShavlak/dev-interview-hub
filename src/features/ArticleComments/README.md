# Feature ArticleComments Documentation

## Overview

The `ArticleComments` module handles the comment-related functionalities for articles in the application. This module follows the Feature-Sliced Design (FSD) architecture, promoting a clear separation of concerns and modularity. It integrates with Redux for state management and provides services to fetch and add comments. Below is a detailed breakdown of the module structure.

## Module Structure

The `ArticleComments` module is organized into several subdirectories, each playing a unique role in handling comments for articles.

```text
ArticleComments/
├── model/
│   ├── selectors/
│   │   └── comments.ts
│   ├── services/
│   │   ├── addCommentForArticle/
│   │   │   └── addCommentForArticle.ts
│   │   ├── fetchCommentsByArticleId/
│   │   │   └── fetchCommentsByArticleId.ts
│   ├── slices/
│   │   └── articleCommentsSlice.ts
│   └── types/
│       └── ArticleCommentsSchema.ts
├── ui/
│   └── ArticleComments.tsx
├── index.ts
└── testing.ts
```

## Detailed Description

### 1. `model/`: Core logic and data structures for the ArticleComments module.

- **`selectors/`**
    - [**comments.ts**](./model/selectors/README.md): Contains selector functions to retrieve the list of comments from the Redux store based on the article ID.

- **`services/`**
    - **`addCommentForArticle/`**
        - [**addCommentForArticle/.ts**](./model/services/addCommentForArticle/README.md): Service function that handles adding a new comment to an article. It dispatches necessary actions to update the state after the comment is successfully added.
    - **`fetchCommentsByArticleId/`**
        - [**fetchCommentsByArticleId/.ts**](./model/services/fetchCommentsByArticleId/README.md): Service function that fetches comments based on the article ID from the API. It manages loading and error states while populating the Redux store with the fetched comments.
      
- **`slices/`**
    - [**articleCommentsSlice.ts**](model/slices/README.md): Defines the Redux slice for managing the comments state. It contains reducers for adding comments, fetching comments, and handling error and loading states.
  
- **`types/`**
    - [**ArticleCommentsSchema.ts**](./model/types/ArticleCommentsSchema.ts): Schema for article comments.

### 2. `ui/`: UI components related to the ArticleComments module.

- [**ArticleComments**](./ui/README.md): Main component for rendering the comments section of an article.

### 3. `index.ts`
- Entry point for the `ArticleComments` module, exporting components and types.

### 4. `testing.ts`

Entry point for testing-related functionalities within the `ArticleComments` module. 
It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. 
This file is not included in the production code but is essential for ensuring the module's functionality during development.

## Public API

- **Types**:
    - `ArticleCommentsSchema`: Schema defining the structure for article comments.

- **Components**:
    - `ArticleComments`: Component for displaying article comments.

## Public Testing API
- **Testing Exports**:
    - `articleDetailsReducer` - Reducer for article comments state management for use in testing scenarios and development tools.


## Conclusion
The `ArticleComments` module provides a comprehensive solution for managing article comments. With clear separation between UI components, services, and Redux state management, the module is highly maintainable and scalable. It also supports integration with feature flags for adapting the UI between legacy and redesigned versions. 
This modular architecture ensures that the comments section remains robust, performant, and user-friendly.
