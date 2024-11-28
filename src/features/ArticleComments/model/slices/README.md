# Documentation for `articleCommentsSlice`

## Overview
The `articleCommentsSlice` manages the state of comments associated with an article within the application's Redux store. It leverages `createEntityAdapter` for efficient state normalization and provides selectors for accessing comment entities.
The `createEntityAdapter` simplifies the process of handling collections of entities by automatically generating a set of basic CRUD operations (Create, Read, Update, Delete) and selectors, both for individual entities and for all entities at once.

## Import Statements

```typescript
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchCommentsByArticleIdThunk } from './fetchCommentsByArticleIdThunk';
import { ArticleCommentsSchema } from './ArticleCommentsSchema';
```

- `createEntityAdapter`: Redux Toolkit utility for managing normalized data structures.
- `createSlice`: Redux Toolkit utility for creating Redux slices.
- `PayloadAction`: Type from Redux Toolkit defining action payload shapes.
- `Comment`: Type representing the structure of individual comments.
- `StateSchema`: Type representing the overall shape of the Redux store state.
- `fetchCommentsByArticleIdThunk`: Asynchronous thunk action for fetching comments by article ID.
- `ArticleCommentsSchema`: TypeScript type defining the schema for article comments state.

## Initial State
```typescript
const initialState: commentsAdapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
})
```
The initial state of the slice is defined using the `commentsAdapter.getInitialState<ArticleCommentsSchema>()` method. This method initializes the state with a normalized structure for handling comment entities. The initial state includes:
- `isLoading`: A boolean indicating if comments are currently being loaded.
- `error`: An optional property for storing error messages.
- `ids`: An array that will hold the IDs of the comments.
- `entities`: An object that will store the comments themselves, keyed by their IDs.

## Entity Adapter Configuration
```typescript
const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
});
```
The `commentsAdapter` is configured with a custom `selectId` function, which specifies how to identify each comment entity by its `id` property. 
This adapter generates a set of pre-built CRUD operations for managing comment entities, both individually and as a collection. These operations include adding, updating, and removing entities, as well as retrieving entities by their IDs or retrieving the entire collection.


## Selectors 
```typescript
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);
```
The `getArticleComments` selector is generated using the adapter's `getSelectors` method. 
It is configured to select comments from the `articleDetailsPage` slice of the state, or to return the adapter's initial state if no comments are present. 
This selector provides an abstraction for accessing normalized comment entities, either as individual items or as a collection, directly from the Redux store.


## Slice Definition

- **name**: The name of the slice, which is **'articleCommentsSlice'**.
- **initialState**: The initial state defined earlier.
- **reducers**: An object containing reducer functions (currently empty).
- **extraReducers**: An object containing extraReducer functions for handling async actions related to comment fetching.

## Extra Reducers

| **Action**                          | **Description**                                           | **Payload**                    | **State Changes**                                                                |
|-------------------------------------|-----------------------------------------------------------|--------------------------------|----------------------------------------------------------------------------------|
| `fetchCommentsByArticleIdThunk.pending`  | Indicates that comments for an article are being fetched. | None                           | Sets `isLoading` to `true` and clears any existing `error`.                      |
| `fetchCommentsByArticleIdThunk.fulfilled`| Handles successful fetching of comments.                  | Array of `Comment` objects     | Updates state with fetched comments using `commentsAdapter.setAll`.              |
| `fetchCommentsByArticleIdThunk.rejected` | Handles errors encountered during comment fetching.       | Error information              | Sets `isLoading` to `false` and updates `error` with the payload.                |

## Exports
```typescript
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
```
- **articleCommentsReducer**: The reducer function generated by the slice, intended for use in the Redux store.

## Usage Example
```typescript jsx
import { articleCommentsReducer } from '@/widgets/ArticleComments';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        comments: articleCommentsReducer,
    },
});

 // dispatching actions 
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CommentList } from '@/entities/Comment';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleIdThunk } from '../model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk';
import { getArticleComments } from '../model/slices/articleCommentsSlice';
import {
    useArticleCommentsError,
    useArticleCommentsIsLoading,
} from '../model/selectors/comments';

export interface ArticleCommentsProps {
    className?: string;
    id?: string;
}

const ArticleComments = memo((props: ArticleCommentsProps) => {
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useArticleCommentsIsLoading();
    const error = useArticleCommentsError();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleIdThunk(id));
    });

    return (
        <CommentList
            isLoading={commentsIsLoading}
            comments={comments}
            error={error}
        />
    );
});

export default ArticleComments;

```

## Conclusion
The `articleCommentsSlice` is a robust solution for managing the state of comments related to an article in a Redux-based application. 
By utilizing `createEntityAdapter`, it ensures efficient and normalized handling of comment data.
This adapter abstracts much of the boilerplate involved in managing entity collections by automatically generating a set of basic CRUD operations (Create, Read, Update, Delete) and selectors. These operations can be applied to both individual entities and all entities at once, removing the need to manually implement these functionalities. The slice seamlessly integrates with asynchronous thunks like `fetchCommentsByArticleIdThunk`, providing a structured approach to manage loading states and errors. This results in a more maintainable and scalable state management solution for applications that rely heavily on user comments.
