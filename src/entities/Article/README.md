# Entity Article Documentation

## Overview

The `Article` module is responsible for managing all article-related functionalities within the React application. This module adheres to the Feature-Sliced Design (FSD) architecture, which promotes modularity, scalability, and maintainability. The following documentation provides a comprehensive overview of each component of the `Article` module.

## Module Structure

The `Article` module is organized into several directories, each serving a distinct purpose:
```text
Article/
├── model/
│   ├── consts/
│   │   └── articleConsts.ts
│   ├── selectors/
│   │   └── articleDetails.ts
│   ├── services/
│   │   └── fetchArticleById/
│   │       └── fetchArticleById.ts
│   ├── slice/
│   │   └── articleDetailsSlice.ts
│   └── types/
│       ├── article.ts
│       └── articleDetailsSchema.ts
├── ui/
│   ├── ArticleCard/
│   │   ├── GridViewCard/
│   │   │   ├── DeprecatedGridViewCard/
│   │   │   │   └── DeprecatedGridViewCard.tsx
│   │   │   └── RedesignedGridViewCard/
│   │   │       └── RedesignedGridViewCard.tsx
│   │   ├── ListViewCard/
│   │   │   ├── DeprecatedListViewCard/
│   │   │   │   └── DeprecatedListViewCard.tsx
│   │   │   └── RedesignedListViewCard/
│   │   │       └── RedesignedListViewCard.tsx
│   │   ├── ArticleCard.tsx
│   │   └── ArticleCard.module.scss
│   ├── ArticleCardSkeleton/
│   │   ├── GridViewCardSkeleton/
│   │   │   └── GridViewCardSkeleton.tsx
│   │   ├── ListViewCardSkeleton/
│   │   │   └── ListViewCardSkeleton.tsx
│   │   └── ArticleCardSkeleton.tsx
│   ├── ArticleCategories/
│   │   ├── ArticleCategories.tsx
│   │   └── ArticleCategories.module.scss
│   ├── ArticleViews/
│   │   └── ArticleViews.tsx
│   ├── ArticleTextBlockComponent/
│   │   ├── ArticleTextBlockComponent.tsx
│   │   └── ArticleTextBlockComponent.module.scss
│   ├── ArticleCodeBlockComponent/
│   │   ├── ArticleCodeBlockComponent.tsx
│   │   └── ArticleCodeBlockComponent.module.scss
│   ├── ArticleImageBlockComponent/
│   │   ├── ArticleImageBlockComponent.tsx
│   │   └── ArticleImageBlockComponent.module.scss
│   ├── ArticleDetails/
│   │   ├── ArticleDetailsError/
│   │   │   └── ArticleDetailsError.tsx
│   │   ├── ArticleDetailsSkeleton/
│   │   │   └── ArticleDetailsSkeleton.tsx
│   │   ├── DeprecatedArticleDetails/
│   │   │   └── DeprecatedArticleDetails.tsx
│   │   ├── RedesignedArticleDetails/
│   │   │   └── RedesignedArticleDetails.tsx
│   │   ├── ArticleDetails.tsx
│   │   ├── ArticleDetails.module.scss
│   │   └── renderArticleBlock.tsx
│   ├── ArticleList/
│   │   ├── ArticleListSkeleton/
│   │   │   └── ArticleListSkeleton.tsx
│   │   ├── NoArticleFound/
│   │   │   └── NoArticleFound.tsx
│   │   ├── ArticleList.tsx
│   │   └── ArticleList.module.scss
├── index.ts
└── testing.ts
```

## Detailed Description

## Detailed Description

### 1. `model/`: Core logic and data structures for the Article module.

- **`consts/`**
  - **`articleConsts.ts`**: Defines constants for article states and configurations.

- **`selectors/`**
  - **`articleDetails.ts`**: Contains selector functions to retrieve article-related data from the Redux store.

- **`services/`**
  - **`fetchArticleById/`**
    - **`fetchArticleById.ts`**: Fetches article data by ID from the API.

- **`slice/`**
  - **`articleDetailsSlice.ts`**: Manages article-related state in Redux, including actions and reducers.

- **`types/`**
  - **`article.ts`**: TypeScript types for article objects.
  - **`articleDetailsSchema.ts`**: Schema for article details.

### 2. `ui/`: UI components related to the Article module.

- **`ArticleCard/`**
  - **`ArticleCard.tsx`**: Main component for displaying an article in card format.
  - **`ArticleCard.module.scss`**: Styles for the `ArticleCard` component.
  - **`GridViewCard/`**
    - **`DeprecatedGridViewCard/`**
      - **`DeprecatedGridViewCard.tsx`**: Legacy card component for grid view.
    - **`RedesignedGridViewCard/`**
      - **`RedesignedGridViewCard.tsx`**: Updated card component for grid view.
  - **`ListViewCard/`**
    - **`DeprecatedListViewCard/`**
      - **`DeprecatedListViewCard.tsx`**: Legacy card component for list view.
    - **`RedesignedListViewCard/`**
      - **`RedesignedListViewCard.tsx`**: Updated card component for list view.

- **`ArticleCardSkeleton/`**
  - **`ArticleCardSkeleton.tsx`**: Skeleton component for the loading state of article cards.
  - **`GridViewCardSkeleton/`**
    - **`GridViewCardSkeleton.tsx`**: Skeleton component for grid view card loading state.
  - **`ListViewCardSkeleton/`**
    - **`ListViewCardSkeleton.tsx`**: Skeleton component for list view card loading state.

- **`ArticleCategories/`**
  - **`ArticleCategories.tsx`**: Component for displaying article  categories.
  - **`ArticleCategories.module.scss`**: Styles for the `ArticleCategories` component.

- **`ArticleViews/`**
  - **`ArticleViews.tsx`**: Component for displaying article view counts.

- **`ArticleTextBlockComponent/`**
  - **`ArticleTextBlockComponent.tsx`**: Component for rendering text blocks within articles.
  - **`ArticleTextBlockComponent.module.scss`**: Styles for the `ArticleTextBlockComponent`.

- **`ArticleCodeBlockComponent/`**
  - **`ArticleCodeBlockComponent.tsx`**: Component for displaying code blocks within articles.
  - **`ArticleCodeBlockComponent.module.scss`**: Styles for the `ArticleCodeBlockComponent`.

- **`ArticleImageBlockComponent/`**
  - **`ArticleImageBlockComponent.tsx`**: Component for displaying images within articles.
  - **`ArticleImageBlockComponent.module.scss`**: Styles for the `ArticleImageBlockComponent`.

- **`ArticleDetails/`**
  - **`ArticleDetails.tsx`**: Main component for displaying detailed article information.
  - **`ArticleDetails.module.scss`**: Styles for the `ArticleDetails` component.
  - **`ArticleDetailsError/`**
    - **`ArticleDetailsError.tsx`**: Component for displaying error states in article details.
  - **`ArticleDetailsSkeleton/`**
    - **`ArticleDetailsSkeleton.tsx`**: Skeleton component for loading states in article details.
  - **`DeprecatedArticleDetails/`**
    - **`DeprecatedArticleDetails.tsx`**: Legacy component for displaying article details.
  - **`RedesignedArticleDetails/`**
    - **`RedesignedArticleDetails.tsx`**: Updated component for displaying article details.
  - **`renderArticleBlock.tsx`**: Utility component for rendering different blocks within article details.

- **`ArticleList/`**
  - **`ArticleList.tsx`**: Component for displaying a list of articles.
  - **`ArticleList.module.scss`**: Styles for the `ArticleList` component.
  - **`ArticleListSkeleton/`**
    - **`ArticleListSkeleton.tsx`**: Skeleton component for loading states in article lists.
  - **`NoArticleFound/`**
    - **`NoArticleFound.tsx`**: Component for displaying a message when no articles are found.


### 3. `index.ts`
- Entry point for the Article module, exporting components, functions, and types.

### 4. `testing.ts`

Entry point for testing-related functionalities within the Article module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.

## Public API

- **Types**:
  - `Article`: Interface defining the structure of an article object.
  - `ArticleDetailsSchema`: Schema defining the structure for article details.

- **Constants**:
  - `ArticleView`, `ArticleSortField`, `ArticleCategory`: Enums related to article views, sorting fields, and categories.

- **Selectors**:
  - `getArticleDetailsData`, `useArticleDetailsData`: Selectors for retrieving detailed article data.
  - `useArticleDetailsIsLoading`, `useArticleDetailsError`: Selectors for checking the loading state and errors related to article details.

- **Components**:
  - `ArticleList`: Component for displaying a list of articles.
  - `NoArticlesFound`: Component shown when no articles are available.
  - `ArticleCard`: Component for displaying individual articles in card format.
  - `ArticleCardSkeleton`: Component for the loading state of an article card.
  - `ArticleListSkeleton`: Component for the loading state of an article list.
  - `ArticleDetails`: Component for displaying detailed information about an article.

## Public Testing API
- **Testing Exports**:
  - `articleDetailsReducer` - Reducer for article details state management for use in testing scenarios and development tools.
  - `testArticleData` -  is a mock object representing article data, designed for use in testing scenarios and development tools.
  - `testArticlesListData` -  is a mock array of objects representing articles data, designed for use in testing scenarios and development tools.


## Conclusion

The `Article` module is designed to manage article-related functionalities in a structured and maintainable manner. By adhering to the FSD architecture, it ensures scalability and seamless integration within the application. The clear separation of concerns, alongside well-defined components, services, and state management practices, contributes to a robust and efficient article management system.

For more details on each part of the module, please refer to the README.md files in each directory.
