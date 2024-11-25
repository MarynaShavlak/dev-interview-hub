# Tests for Slices

## 1. [profileSlice](../../../src/features/EditableProfileCard/model/slices/profileSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Confirms that the `profileReducer` returns the correct initial state when no action is provided.

### Action Tests
- **Setting Readonly Mode**: Verifies that the `setReadonly` action correctly updates the `readonly` state.
- **Canceling Edit Mode**: Ensures that `cancelEdit` resets the form data to the original profile data and sets `readonly` to `true`.
- **Updating Profile Data**: Confirms that the `updateProfile` action correctly updates the form data with new values.

### Async Action Handling
- **Pending Profile Update**: Checks that when the `updateProfileData` service is pending, `isLoading` is set to `true`, and validation errors are cleared.
- **Fulfilled Profile Update**: Ensures that when `updateProfileData` is fulfilled, the profile data is updated, `readonly` is set to `true`, and validation errors are cleared.
- **Empty Profile Data Handling**: Verifies that when `updateProfileData` is fulfilled with empty profile data, the state reflects this correctly with `isLoading` set to `false`, and `data` and `form` set to the empty profile data.

### Toggle Tests
- **Toggling Readonly State**: Ensures that the `readonly` state can be toggled correctly between `true` and `false`.

---

## 2. [loginSlice](../../../src/features/AuthByUsername/model/slices/loginSlice/loginSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Confirms that the `loginReducer` returns the correct initial state when no action is provided.

### Action Tests
- **Setting Username**: Verifies that the `setUsername` action correctly updates the `username` in the state.
- **Setting Password**: Ensures that the `setPassword` action updates the `password` in the state as expected.

### Async Action Handling
- **Pending Login Action**: Checks that when `loginByEmailThunk` is pending, the `isLoading` state is set to `true`, and any previous error is cleared.
- **Fulfilled Login Action**: Confirms that when `loginByEmailThunk` is fulfilled, the `isLoading` state is set to `false`.
- **Rejected Login Action**: Ensures that when `loginByEmailThunk` is rejected, the `isLoading` state is set to `false`, and the error message is correctly set in the state.

### Sequential Actions
- **Handling Multiple Actions**: Verifies that sequential actions, including setting the username and password and handling login states, update the state correctly through pending, fulfilled, and error scenarios.

---

## 3. [addCommentFormSlice](../../../src/entities/Comment/model/slices/addCommentFormSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Confirms that the `addCommentFormReducer` returns the correct initial state when no action is provided.

### Action Tests
- **Setting Comment Text**: Verifies that the `setText` action correctly updates the `text` field in the state when provided with new text.
- **Handling Empty Comment Text**: Ensures that the `setText` action correctly handles cases where the text is set to an empty string, updating the state accordingly.
- **Handling Multiple setText Actions**: Checks that sequential `setText` actions update the state correctly, with the final state reflecting the last action's text.

### Sequential Actions
- **Handling Actions in Sequence**: Validates that the reducer correctly updates the state through a series of actions, maintaining the most recent value.

---

## 4. [scrollSlice](../../../src/widgets/Page/model/slices/scrollSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Ensures that the `scrollReducer` returns the initial state when no action is provided.

### Action Tests
- **Setting Scroll Position**: Verifies that the `setScrollPosition` action correctly updates the scroll position for a given path.
- **Updating Scroll Position for Multiple Paths**: Confirms that the reducer correctly handles adding a new scroll position while retaining existing ones.
- **Updating Existing Scroll Position**: Ensures that the reducer updates the scroll position for an existing path correctly.

### Edge Cases
- **Handling Empty Path**: Verifies that the reducer correctly handles setting the scroll position with an empty path.
- **Handling Negative Scroll Position**: Ensures that the reducer correctly processes negative scroll positions.

---

## 5. [articleDetailsSlice](../../../src/entities/Article/model/slices/articleDetailsSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Ensures that the `articleDetailsReducer` returns the initial state when no action is provided.

### Async Action Handling
- **Pending Fetch Article**: Verifies that the reducer correctly sets `isLoading` to `true` and clears any previous error when the fetch action is pending.
- **Fulfilled Fetch Article with Data**: Confirms that the reducer updates the `data` with the fetched article and sets `isLoading` to `false` when the fetch action is successful.
- **Fulfilled Fetch Article with No Data**: Ensures that the reducer correctly sets `data` to `null` and `isLoading` to `false` when the fetch action succeeds but returns no data.
- **Rejected Fetch Article with Error**: Validates that the reducer sets the `error` and `isLoading` to `false` when the fetch action fails, with the error message properly reflected in the state.

---

## 6. [articleCommentsSlice](../../../src/features/ArticleComments/model/slices/articleCommentsSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Ensures that the `articleCommentsReducer` returns the initial state when no action is provided.

### Async Action Handling
- **Pending Fetch Comments**: Verifies that the reducer sets `isLoading` to `true` and clears any previous error when the fetch action is pending.
- **Fulfilled Fetch Comments**: Confirms that the reducer updates the `ids` and `entities` with the fetched comments and sets `isLoading` to `false` when the fetch action is successful.
- **Rejected Fetch Comments**: Ensures that the reducer sets the `error` and `isLoading` to `false` when the fetch action fails.

### Edge Cases
- **Fulfilled Fetch Comments with Empty Array**: Verifies that the reducer handles an empty comments array correctly, resulting in empty `ids` and `entities`.
- **Fulfilled Fetch Comments with Duplicates**: Ensures that the reducer handles duplicate comments by keeping only unique entries in `ids` and `entities`.

---

## 7. [userSlice](../../../src/entities/User/model/slices/userSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Ensures that the `userReducer` returns the initial state when no action is provided.

### Action Tests
- **Setting Auth Data**: Verifies that the reducer correctly sets the `authData` in the state.
- **Logout Action**: Confirms that the reducer clears the `authData` when the `logout` action is dispatched.

### Async Action Handling
- **Fulfilled Save JSON Settings**: Checks that the reducer updates the `jsonSettings` in `authData` when `saveJsonSettings` completes successfully.
- **Fulfilled Init Auth Data**: Ensures that the reducer sets the `authData` and `_inited` flag to `true` upon successful initialization.
- **Rejected Init Auth Data**: Verifies that the `_inited` flag is set to `true` even if the initialization fails.

### Concurrent Actions
- **Handling Multiple Save JSON Settings Actions**: Confirms that the reducer handles multiple `saveJsonSettings` actions correctly by applying the most recent settings.

---

## 8. [articlesPageSlice](../../../src/pages/ArticlesPage/model/slices/articlesPageSlice.test.ts) Reducers

### Initial State Tests
- **Initial State**: Ensures that the `articlesPageReducer` returns the initial state when no action is provided.

### Action Tests
- **Setting View**: Verifies that the `setView` action correctly updates the `view` property in the state.
- **Setting Page**: Confirms that the `setPage` action updates the `page` property in the state as expected.
- **Setting Order**: Ensures that the `setOrder` action updates the `order` property in the state with the correct sort order.
- **Setting Sort**: Validates that the `setSort` action correctly updates the `sort` field in the state.
- **Setting Category**: Confirms that the `setCategory` action updates the `category` field in the state with the chosen category.
- **Setting Search**: Verifies that the `setSearch` action updates the `search` property in the state with the new search term.
- **Setting Limit**: Ensures that the `setLimit` action correctly updates the `limit` property in the state.
- **Setting Scroll Stop Article Index**: Confirms that the `setScrollStopArticleIndex` action updates the `scrollStopArticleIndex` in the state.
- **Initializing State**: Verifies that the `initState` action initializes the state with the correct `view`, `limit`, and `_inited` properties.

### Async Action Handling
- **Pending Fetch Articles List**: Ensures that when `fetchArticlesList` is pending, the `isLoading` property is set to `true`, and any previous `error` is cleared.
- **Fulfilled Fetch Articles with Replace Option**: Confirms that the `fetchArticlesList.fulfilled` action replaces the current articles in the state when the `replace` option is used.
- **Fulfilled Fetch Articles with AddMany Option**: Verifies that the `fetchArticlesList.fulfilled` action appends new articles to the existing ones in the state when the `addMany` option is used.
- **Rejected Fetch Articles**: Ensures that when `fetchArticlesList` is rejected, the `error` property is updated with the error message, and `isLoading` is set to `false`.
