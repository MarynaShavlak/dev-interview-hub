# Documentation for `articlesPageSlice`

## Overview
The `articlesPageSlice` manages the state of articles on a specific page within the Redux store. It uses `createEntityAdapter` to handle article entities efficiently, provides reducers for modifying various aspects of the article list, and integrates with asynchronous thunks to fetch articles. It also handles view and sorting preferences, pagination, and search functionality, and persists some state to localStorage.

## Import Statements
```typescript
import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Article,
    ArticleSortField,
    ArticleView,
    ArticleCategory,
} from '@/entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sortOrder';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
```
- `createEntityAdapter`: Redux Toolkit utility for managing normalized data structures.
- `buildSlice`: A custom utility function for creating Redux slices.
- `PayloadAction`: Type from Redux Toolkit defining action payload shapes.
- `StateSchema`: Type representing the overall shape of the Redux store state.
- `Article`, `ArticleSortField`, `ArticleView`, `ArticleCategory`: Types related to articles, including sorting fields, view types, and categories.
- `SortOrder`: Type representing sorting order (ascending/descending).
- `ArticlesPageSchema`: TypeScript type defining the schema for articles page state.
- `fetchArticlesList`: Asynchronous thunk action for fetching a list of articles.

## Initial State
```typescript
const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.GRID,
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    category: ArticleCategory.ALL,
    scrollStopArticleIndex: 0,
});
```
The initial state of the slice is set up with `articlesAdapter.getInitialState<ArticlesPageSchema>()`, which initializes the state for managing article entities. It includes:

- `isLoading`: Boolean indicating if articles are currently being loaded.
- `error`: Optional property for storing error messages.
- `ids`: Array of article IDs.
- `entities`: Object storing articles keyed by their IDs.
- `view`: The current view type for displaying articles (e.g., grid or list).
- `page`: Current page number for pagination.
- `hasMore`: Boolean indicating if there are more articles to load.
- `_inited`: Boolean indicating if the initial state has been set.
- `limit`: Number of articles to display per page.
- `sort`: Field by which articles are sorted.
- `search`: Search query for filtering articles.
- `order`: Sorting order (ascending or descending).
- `category`: Current category for filtering articles.
- `scrollStopArticleIndex`: The index of the last article loaded in the viewport, used to manage the lazy loading of articles by tracking the user's scroll position. This ensures that users can continue loading articles from where they left off without losing their scroll position.


## Entity Adapter Configuration
```typescript
const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});
```
The `articlesAdapter` is configured to manage articles, with a custom `selectId` function to identify each article by its `id` property. This adapter provides built-in CRUD operations for managing article entities, simplifying state management by handling common tasks such as adding, updating, and removing entities, and retrieving them by ID or as a collection.

## Selectors
```typescript
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);
```
The `getArticles` selector is created using the adapter's `getSelectors` method. It selects articles from the `articlesPage` slice of the state or returns the adapter's initial state if no articles are present. This selector provides a standardized method for accessing normalized article entities, facilitating efficient data retrieval and management.

## Slice Definition

- **name**: The name of the slice, which is **'articlesPageSlice'**.
- **initialState**: The initial state defined earlier.
- **reducers**: An object containing reducer functions for modifying state properties.
- **extraReducers**: An object containing extraReducer functions for handling async actions related to article fetching.

## Reducers

| Reducer       | Action Payload Type           | State Change                                                                                              | Purpose                                                                                              |
|---------------|-------------------------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `setView`     | `PayloadAction<ArticleView>`  | Updates the `view` property with the new view type.                                                       | Allows users to switch between different view types (e.g., grid or list) and persists the selection.|
| `setPage`     | `PayloadAction<number>`       | Updates the `page` property to reflect the new page number.                                               | Manages pagination by setting the current page number.                                               |
| `setOrder`    | `PayloadAction<SortOrder>`    | Updates the `order` property with the new sorting order (ascending/descending).                           | Controls the order in which articles are sorted.                                                     |
| `setSort`     | `PayloadAction<ArticleSortField>` | Updates the `sort` property with the new field used for sorting articles.                                 | Specifies the criteria by which articles are sorted (e.g., creation date).                           |
| `setCategory` | `PayloadAction<ArticleCategory>` | Updates the `category` property to filter articles by a new category.                                     | Filters articles based on the selected category.                                                     |
| `setSearch`   | `PayloadAction<string>`       | Updates the `search` property with the new search query.                                                  | Updates the search filter to find articles matching the query.                                        |
| `setLimit`    | `PayloadAction<number>`       | Updates the `limit` property with the new number of articles to display per page.                         | Allows for changing the number of articles displayed per page.                                      |
| `setScrollStopArticleIndex`    | `PayloadAction<number>`       | Updates the `scrollStopArticleIndex` to keep track of the user's current position in the article list.    | Used for implementing lazy loading of articles. This allows users to continue browsing from where they left off.                                      |
| `initState`   | `PayloadAction<ArticleView>`                        | Initializes the state based on the view type, adjusting the `limit` accordingly, and sets `_inited` to `true`. | Sets up the initial state for the page by configuring the view type and adjusting the article limit based on the view type, and marks the state as initialized.        |

## Extra Reducers

| Action                      | State Change                                                   | Purpose                                                                                                  |
|-----------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `fetchArticlesList.pending` | Sets `isLoading` to `true`, clears `error`, and removes all articles if `replace` is `true`. | Indicates that the article fetching process has started, clears previous errors, and prepares for new data. |
| `fetchArticlesList.fulfilled` | Sets `isLoading` to `false`, updates `hasMore` based on the length of the fetched articles, and either replaces or adds articles based on `replace`. | Handles the successful retrieval of articles, updates the state with new articles, and determines if more articles are available. |
| `fetchArticlesList.rejected` | Sets `isLoading` to `false` and updates `error` with the payload. | Manages the state when article fetching fails by setting `isLoading` to `false` and storing the error message. |


## Exports
```typescript
export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
    useActions: useArticlesPageActions,
} = articlesPageSlice;
```
- **articlesPageReducer**: The reducer function generated by the slice for use in the Redux store.
- **articlesPageActions**: The actions generated by the slice for dispatching state changes.
- **useArticlesPageActions**: A custom hook for accessing slice actions in React components



## Usage Example 
```typescript jsx
import { articlesPageReducer } from '@/pages/ArticlesPage';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        comments: articlesPageReducer,
    },
});


// async thunk 
export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        await dispatch(fetchArticlesList({}));
    }
});
```
## Conclusion
The `articlesPageSlice` provides a comprehensive solution for managing the state of articles on a page in a Redux-based application. 
By using `createEntityAdapter`, it ensures efficient handling of article data with built-in CRUD operations. 
The slice supports various features such as view preferences, pagination, sorting, and search, and integrates with asynchronous actions for fetching articles. State changes and preferences are persisted to localStorage, enhancing the user experience by retaining settings across sessions.
Additionally, the `scrollStopArticleIndex` property is included to manage the position of the last article viewed by the user, allowing for seamless continuation from where they left off in the event of a page reload or when navigating away and returning to the articles page. This feature enhances user experience by preventing the need to manually find the last-read article. Overall, this slice offers a scalable and maintainable approach to managing complex article-related state while ensuring a user-friendly interface.
