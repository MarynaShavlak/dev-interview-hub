# Project Test Suite

The project uses four types of tests:

1. **Unit Tests with Jest**
Command: `npm run test:unit`
Focus: Regular unit testing for core functionality.

2. **Component Tests with React Testing Library**
Command: `npm run test:unit`
Focus: Testing React components' behavior and rendering.

3. **Screenshot Testing with Loki**
Command: `n`pm run test:ui`
Focus: Visual regression testing to ensure UI consistency.

4. **End-to-End (E2E) Testing with Cypress**
Command: `npm run test:e2e`
Focus: Comprehensive testing of user flows and interactions.



## Regular unit tests with Jest
The project includes comprehensive unit tests to ensure that individual functions and modules work as expected.

1. **Test for function [classNames](../src/shared/lib/classes/classNames/classNames.test.ts)**:
   - The `classNames` function is tested with various scenarios to ensure it correctly combines class names based on provided parameters, including base classes, additional classes, and conditional modifications (`mods`).
2. **Test for function [getFlexClasses](../src/shared/lib/classes/getFlexClasses/getFlexClasses.test.ts)**:
    - The `getFlexClasses` function is tested to verify that it correctly generates an array of CSS class names based on flexbox configuration options. The tests cover different combinations of vertical and horizontal stacking, gap spacing, justification, and alignment to ensure the appropriate classes are applied.
3. **Test for function [addQueryParams](../src/shared/lib/url/addQueryParams/addQueryParams.test.ts)**:
    - The `addQueryParams` function is tested to ensure it correctly adds or updates query parameters in the browser's URL. The tests cover scenarios with one or multiple parameters, as well as handling undefined values to confirm that only valid parameters are included in the final URL.
4. **Test for function [toggleFeatures](../src/shared/lib/features/lib/toggleFeatures/toggleFeatures.test.ts)**:
    - The `toggleFeatures` function is tested to validate its behavior in managing feature flags within a React application. The tests examine different scenarios, including when feature flags are enabled, disabled, undefined, or set to null. The function is also tested with edge cases where `on()` and `off()` return the same value to ensure consistent and predictable behavior.
5. **Test for function [trimText](../src/shared/lib/trimText/trimText.test.ts)**:
    - The `trimText` function is tested to ensure it correctly removes leading and trailing whitespace from a given string. The tests cover various scenarios, including strings with leading, trailing, or both types of whitespace, empty strings, and handling of `undefined` or `null` inputs to verify that the function returns an empty string in those cases.

## Component tests with React Testing Library

The project includes component tests using React Testing Library to verify that React components render correctly and behave as expected.

1. **Test for component [Button](../src/shared/ui/deprecated/Button/Button.test.tsx)**:
   - Tests verify that the `Button` component renders with the correct text and HTML tag, and applies the `clear` class when using the `ButtonTheme.CLEAR` theme.
2. **Test for component [Sidebar](../src/widgets/Sidebar/ui/Sidebar/Sidebar.test.tsx)**:
   - Tests verify that the `Sidebar` component renders correctly and responds to toggle interactions by collapsing when the toggle button is clicked.
3. **Test for component [AppRouter](../src/app/providers/router/ui/tests/AppRouter.test.tsx)**:
   - Tests ensure that the `AppRouter` component correctly renders pages based on routing, handles invalid routes by showing a "Not Found" page, redirects unauthorized users to the "Main" page, allows access to the "Profile" page for authorized users, and manages access to the "Admin" page based on user roles.
4. **Test for component [EditableProfileCard](../src/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard.test.tsx)**:
   - Tests verify that the `EditableProfileCard` component correctly switches to edit mode, resets form values to their original state upon cancellation, displays an error when form validation fails, and sends a PUT request when the form is successfully saved.
5. **Test for component [NotificationButton](../src/features/notificationButton/ui/NotificationButton/NotificationButton.test.tsx)**:
   - Tests verify that the `NotificationButton` component renders correctly, opens a drawer on mobile view and a popover on browser view when the button is clicked, handles closing the drawer when the overlay is clicked, and correctly toggles the drawer state multiple times.
6. **Test for component [Rating](../src/entities/Rating/ui/Rating/Rating.test.tsx)**:
   - Tests ensure that the `Rating` component renders with a title, correctly displays a thank-you message when a rating is provided, and appropriately shows or hides the feedback modal based on the component's configuration. Tests also verify that the feedback modal can be closed without submitting feedback or that it correctly submits the feedback and closes.
7. **Test for component [LoginForm](../src/features/AuthByUsername/ui/LoginForm/LoginForm.test.tsx)**:
   - Tests ensure that the `LoginForm` component renders correctly, updates the username and password fields on user input, and handles various login scenarios, such as displaying error messages for incorrect credentials, empty fields, or failed login attempts. Tests also verify that the login button is disabled while loading, the `onSuccess` callback is called upon successful login, and the form can clear error messages and retry after a failed login attempt.
8. **Test for component [AddCommentForm](../src/entities/Comment/ui/AddCommentForm/AddCommentForm.test.tsx)**:
   - Tests ensure that the `AddCommentForm` component renders correctly, updates the comment text field on user input, and handles comment submission. Tests verify that the `onSendComment` callback is called with the correct comment, the comment text field is cleared after submission, and the send button is enabled or disabled based on the input's state.

## Selector tests

The project also includes tests for selectors to ensure that they correctly extract and transform data from the state.

1. **Test for  [articleDetails selectors](../src/entities/Article/model/selectors/articleDetails.test.ts)**:
   - **Test for `getArticleDetailsData`**: Verifies that the selector correctly returns article details data from the state, including handling cases where the state is empty.
   - **Test for `getArticleDetailsError`**: Ensures that the selector returns the error state for article details, including handling empty state scenarios.
   - **Test for `getArticleDetailsIsLoading`**: Confirms that the selector returns the loading state for article details, and handles cases where the state is empty or not specified.

2. **Test for `user selectors`**:
   - **Test for [getUserAuthData](../src/entities/User/model/selectors/getUserAuthData/getUserAuthData.test.ts)**: Verifies that the selector returns the authentication data for the user, including handling cases with an empty state.
   - **Test for [getUserInited](../src/entities/User/model/selectors/getUserInited/getUserInited.test.ts)**: Ensures that the selector correctly returns the `_inited` value indicating whether the user has been initialized, and handles empty state scenarios.
   - **Test for [getJsonSettings](../src/entities/User/model/selectors/getJsonSettings/getJsonSettings.test.ts)**: Confirms that the selector returns the user's JSON settings from authentication data, and correctly returns default settings when the authData is empty or when the state is empty.
   - **Test for [isUserAdmin](../src/entities/User/model/selectors/roles/userSelectors.test.ts)**: Checks that the selector correctly identifies if the user has an admin role based on their roles in the state.
   - **Test for [isUserManager](../src/entities/User/model/selectors/roles/userSelectors.test.ts)**: Verifies that the selector accurately identifies if the user has a manager role based on their roles in the state, and returns false for non-admin and non-manager roles. It also ensures that it handles cases with empty state.

3. **Test for `login form selectors`**:
   - **Test for [getLoginUsername](../src/features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername.test.ts)**: Verifies that the selector correctly returns the username from the login form state, and handles cases with an empty state.
   - **Test for [getLoginPassword](../src/features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword.ts)**: Ensures that the selector returns the password from the login form state, including scenarios with an empty state.
   - **Test for [getLoginIsLoading](../src/features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading.test.ts)**: Confirms that the selector correctly returns the loading state for the login form, and handles cases with an empty state.
   - **Test for [getLoginError](../src/features/AuthByUsername/model/selectors/getLoginError/getLoginError.test.ts)**: Verifies that the selector correctly returns the error message from the login form state, and manages cases where the state is empty.

4. **Test for selector `profile selectors`**:
   - **Test for [getProfileData](../src/features/editableProfileCard/model/selectors/getProfileData/getProfileData.test.ts)**: Verifies that the selector correctly returns the profile data from the state, including handling cases with an empty state.
   - **Test for [getProfileError](../src/features/editableProfileCard/model/selectors/getProfileError/getProfileError.test.ts)**: Ensures that the selector returns the profile error from the state, and handles scenarios where the state is empty.
   - **Test for [getProfileForm](../src/features/editableProfileCard/model/selectors/getProfileForm/getProfileForm.test.ts)**: Confirms that the selector returns the profile form data, including handling cases where the state is empty.
   - **Test for [getProfileIsLoading](../src/features/editableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading.test.ts)**: Verifies that the selector correctly returns the loading status of the profile, and handles empty state scenarios.
   - **Test for [getProfileReadonly](../src/features/editableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly.test.ts)**: Ensures that the selector correctly returns the readonly status of the profile, and handles scenarios where the state is empty.
   - **Test for [getProfileValidateErrors](../src/features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors.test.ts)**: Confirms that the selector returns profile validation errors, including handling cases where the state is empty.

5. **Test for selector [scroll selectors](../src/widgets/Page/model/selectors/getUIScroll.test.ts)**:
   - **Test for `getUIScroll`**: Verifies that the selector correctly returns the entire scroll state from the state, including handling cases where the scroll state is missing or undefined.
   - **Test for `getUIScrollByPath`**: Confirms that the selector returns the scroll value for a given path, including handling cases with unknown paths or missing scroll values.

6. **Test for selector `getCanEditArticle`**:
   - **Test for [getCanEditArticle](../src/pages/ArticleDetailsPage/model/selectors/getCanEditArticle/getCanEditArticle.test.ts)**: Verifies that the selector returns `true` when the article's author matches the authenticated user, and `false` otherwise. It also handles cases where either article data or user data is missing, returning `false` in those scenarios.

## Tests for slices

1. **Test for [profileSlice](../src/features/editableProfileCard/model/slice/profileSlice.test.ts) reducers**:
   - **Initial state test**: Confirms that the `profileReducer` returns the correct initial state when no action is provided.
   - **Test for setting readonly mode**: Verifies that the `setReadonly` action correctly updates the `readonly` state.
   - **Test for canceling edit mode**: Ensures that `cancelEdit` resets the form data to the original profile data and sets `readonly` to `true`.
   - **Test for updating profile data**: Confirms that the `updateProfile` action correctly updates the form data with new values.
   - **Test for handling pending state during profile update**: Checks that when the `updateProfileData` service is pending, `isLoading` is set to `true` and validation errors are cleared.
   - **Test for handling fulfilled state during profile update**: Ensures that when `updateProfileData` is fulfilled, the profile data is updated, `readonly` is set to `true`, and validation errors are cleared.
   - **Test for empty profile data**: Verifies that when `updateProfileData` is fulfilled with empty profile data, the state correctly reflects this with `isLoading` set to `false`, and `data` and `form` set to the empty profile data.
   - **Test for toggling readonly state**: Ensures that the `readonly` state can be toggled between `true` and `false` correctly.

2. **Test for [loginSlice](../src/features/AuthByUsername/model/slice/loginSlice.test.ts) reducers**:
   - **Initial state test**: Confirms that the `loginReducer` returns the correct initial state when no action is provided.
   - **Test for setting username**: Verifies that the `setUsername` action correctly updates the `username` in the state.
   - **Test for setting password**: Ensures that the `setPassword` action updates the `password` in the state as expected.
   - **Test for handling pending login action**: Checks that when `loginByUsername` is pending, the `isLoading` state is set to `true` and any previous error is cleared.
   - **Test for handling fulfilled login action**: Confirms that when `loginByUsername` is fulfilled, the `isLoading` state is set to `false`.
   - **Test for handling rejected login action**: Ensures that when `loginByUsername` is rejected, the `isLoading` state is set to `false` and the error message is correctly set in the state.
   - **Test for handling multiple actions in sequence**: Verifies that sequential actions, including setting the username and password and handling login states, update the state correctly through pending, fulfilled, and error scenarios.

3. **Test for [addCommentFormSlice](../src/entities/Comment/model/slices/addCommentFormSlice.test.ts) reducers**:
   - **Initial state test**: Confirms that the `addCommentFormReducer` returns the correct initial state when no action is provided.
   - **Test for setting comment text**: Verifies that the `setText` action correctly updates the `text` field in the state when provided with new text.
   - **Test for handling empty comment text**: Ensures that the `setText` action correctly handles cases where the text is set to an empty string, updating the state accordingly.
   - **Test for handling multiple setText actions**: Checks that sequential `setText` actions update the state correctly, with the final state reflecting the last action's text.
   - **Test for handling actions in sequence**: Validates that the reducer correctly updates the state through a series of actions, maintaining the most recent value.

4. **Test for [scrollSlice](../src/widgets/Page/model/slices/scrollSlice.test.ts) reducers**:
   - **Initial state test**: Ensures that the `scrollReducer` returns the initial state when no action is provided.
   - **Test for setting scroll position**: Verifies that the `setScrollPosition` action correctly updates the scroll position for a given path.
   - **Test for updating scroll position for multiple paths**: Confirms that the reducer correctly handles adding a new scroll position while retaining existing ones.
   - **Test for updating existing scroll position**: Ensures that the reducer updates the scroll position for an existing path correctly.
   - **Test for handling empty path**: Verifies that the reducer correctly handles setting the scroll position with an empty path.
   - **Test for handling negative scroll position**: Ensures that the reducer correctly processes negative scroll positions.

5. **Test for [articleDetailsSlice](../src/entities/Article/model/slice/articleDetailsSlice.test.ts) reducers**:
   - **Initial state test**: Ensures that the `articleDetailsReducer` returns the initial state when no action is provided.
   - **Test for `fetchArticleById.pending`**: Verifies that the reducer correctly sets `isLoading` to `true` and clears any previous error when the fetch action is pending.
   - **Test for `fetchArticleById.fulfilled` with data**: Confirms that the reducer updates the `data` with the fetched article and sets `isLoading` to `false` when the fetch action is successful.
   - **Test for `fetchArticleById.fulfilled` with no data**: Ensures that the reducer correctly sets `data` to `null` and `isLoading` to `false` when the fetch action succeeds but returns no data.
   - **Test for `fetchArticleById.rejected` with specific error message**: Validates that the reducer sets the `error` and `isLoading` to `false` when the fetch action fails, with the error message properly reflected in the state.

6. **Test for [articleCommentsSlice](../src/features/ArticleComments/model/slices/articleCommentsSlice.test.ts) reducers**:
   - **Initial state test**: Ensures that the `articleCommentsReducer` returns the initial state when no action is provided.
   - **Test for `fetchCommentsByArticleId.pending`**: Verifies that the reducer sets `isLoading` to `true` and clears any previous error when the fetch action is pending.
   - **Test for `fetchCommentsByArticleId.fulfilled`**: Confirms that the reducer updates the `ids` and `entities` with the fetched comments and sets `isLoading` to `false` when the fetch action is successful.
   - **Test for `fetchCommentsByArticleId.rejected`**: Ensures that the reducer sets the `error` and sets `isLoading` to `false` when the fetch action fails.
   - **Test for `fetchCommentsByArticleId.fulfilled` with empty array**: Verifies that the reducer handles an empty comments array correctly, resulting in empty `ids` and `entities`.
   - **Test for `fetchCommentsByArticleId.fulfilled` with duplicate comments**: Ensures that the reducer handles duplicate comments by keeping only unique entries in `ids` and `entities`.

7. **Test for [userSlice](../src/entities/User/model/slice/userSlice.test.ts) reducers**:
   - **Initial state test**: Ensures that the `userReducer` returns the initial state when no action is provided.
   - **Test for `setAuthData` action**: Verifies that the reducer correctly sets the `authData` in the state.
   - **Test for `logout` action**: Confirms that the reducer clears the `authData` when the `logout` action is dispatched.
   - **Test for `saveJsonSettings.fulfilled`**: Checks that the reducer updates the `jsonSettings` in `authData` when `saveJsonSettings` completes successfully.
   - **Test for `initAuthData.fulfilled`**: Ensures that the reducer sets the `authData` and `_inited` flag to `true` upon successful initialization.
   - **Test for `initAuthData.rejected`**: Verifies that the `_inited` flag is set to `true` even if the initialization fails.
   - **Test for concurrent actions**: Confirms that the reducer handles multiple `saveJsonSettings` actions correctly by applying the most recent settings.

8. **Test for [articlesPageSlice](../src/pages/ArticlesPage/model/slices/articlesPageSlice.test.ts) reducers**:
   - **Initial state test**: Ensures that the `articlesPageReducer` returns the initial state when no action is provided.
   - **Test for `setView` action**: Verifies that the `setView` action correctly updates the `view` property in the state.
   - **Test for `setPage` action**: Confirms that the `setPage` action updates the `page` property in the state as expected.
   - **Test for `setOrder` action**: Ensures that the `setOrder` action updates the `order` property in the state with the correct sort order.
   - **Test for `setSort` action**: Validates that the `setSort` action correctly updates the `sort` field in the state.
   - **Test for `setCategory` action**: Confirms that the `setCategory` action updates the `category` field in the state with the chosen category.
   - **Test for `setSearch` action**: Verifies that the `setSearch` action updates the `search` property in the state with the new search term.
   - **Test for `setLimit` action**: Ensures that the `setLimit` action correctly updates the `limit` property in the state.
   - **Test for `setScrollStopArticleIndex` action**: Confirms that the `setScrollStopArticleIndex` action updates the `scrollStopArticleIndex` in the state.
   - **Test for `initState` action**: Verifies that the `initState` action initializes the state with the correct `view`, `limit`, and `_inited` properties.
   - **Test for `fetchArticlesList.pending`**: Ensures that when `fetchArticlesList` is pending, the `isLoading` property is set to `true`, and any previous `error` is cleared.
   - **Test for `fetchArticlesList.fulfilled` with `replace` option**: Confirms that the `fetchArticlesList.fulfilled` action replaces the current articles in the state when the `replace` option is used.
   - **Test for `fetchArticlesList.fulfilled` with `addMany` option**: Verifies that the `fetchArticlesList.fulfilled` action appends new articles to the existing ones in the state when the `addMany` option is used.
   - **Test for `fetchArticlesList.rejected`**: Ensures that when `fetchArticlesList` is rejected, the `error` property is updated with the error message, and `isLoading` is set to `false`.

## Service Tests

### 1. AuthByUsername Service

#### [loginByUsername](../src/features/AuthByUsername/model/services/loginByUsername/loginByUsername.test.ts)
- **Success**: Validates successful login with correct credentials.
- **Error Handling**: Covers scenarios such as empty username, missing password, wrong credentials, incomplete response data, network issues, unexpected server responses, and server errors (500).
- **Simultaneous Requests**: Tests the handling of multiple login requests.

### 2. EditableProfileCard Service

#### [fetchProfileData](../src/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData.test.ts)
- **Success**: Ensures profile data is fetched successfully with a valid ID.
- **Error Handling**: Includes tests for 403 status, network errors, missing response data, and simultaneous requests.

#### [updateProfileData](../src/features/editableProfileCard/model/services/updateProfileData/updateProfileData.test.ts)
- **Success**: Verifies profile data updates correctly.
- **Error Handling**: Covers 403 status, incorrect user data, multiple validation issues, network errors, missing response data, incomplete but valid data, missing profile ID, and 401 status.

#### [validateProfileData](../src/features/editableProfileCard/model/services/validateProfileData/validateProfileData.test.ts)
- **Validation Checks**: Tests various scenarios, including missing fields (firstname, lastname, username, age), non-integer age, incorrect fields, and empty/missing profile object.

### 3. Article Service

#### [fetchArticleById](../src/entities/Article/model/services/fetchArticleById/fetchArticleById.test.ts)
- **Success**: Confirms correct fetching of article data.
- **Error Handling**: Tests for missing article, API failures, and undefined article ID.

#### [fetchCommentsByArticleId](../src/features/ArticleComments/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId.ts)
- **Success**: Verifies successful retrieval of comments.
- **Error Handling**: Covers scenarios with no comments, API failures, and missing article ID.

#### [addCommentForArticle](../src/features/ArticleComments/model/services/addCommentForArticle/addCommentForArticle.test.ts)
- **Success**: Ensures comments are added successfully.
- **Error Handling**: Includes cases with missing user data, article details, comment text, API failures, and incomplete response data.

#### [fetchArticlesList](../src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts)
- **Success**: Validates successful article list retrieval based on page settings and filters.
- **Error Handling**: Tests empty response, edge cases, and API

#### [initArticlesPage](../src/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage.test.ts)
- **Initialization**: Verifies correct initialization of the articles page, dispatching appropriate actions and loading articles.
- **No Reinitialization**: Confirms no actions are dispatched if the page is already initialized.

#### [fetchNextArticlesPage](../src/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage.test.ts)
- **Pagination**: Tests correct behavior for fetching the next page, including conditions when `hasMore` is false, `isLoading` is true, and handling of undefined `hasMore`.

####  [useArticleRecommendationsList](../src/features/articleRecommendationsList/api/articleRecommendationsApi.test.tsx) Hook
- **Success**: Ensures correct fetching and handling of article recommendations.
- **Error Handling**: Tests error scenarios during data fetching.

### 4. User Service

#### [getUserDataById](../src/entities/User/api/userApi.test.ts)
- **Request Handling**: Tests correct request structure and handling of successful and unsuccessful responses.

#### [setJsonSettings](../src/entities/User/api/userApi.test.ts)
- **Settings Update**: Validates correct API request structure, successful response handling, and error scenarios.

### 5. Article Rating Service

#### [getArticleRating](../src/features/articleRating/api/articleRatingApi.test.tsx)
- **Request Validation**: Ensures correct API request structure and handling of successful and unsuccessful responses.

####  [useRateArticle](../src/features/articleRating/api/articleRatingApi.test.tsx) Hook
- **Success**: Tests correct loading state transitions and data handling.
- **Error Handling**: Covers API failure scenarios.

####  [useRateArticle](../src/features/articleRating/api/articleRatingApi.test.tsx) Hook
- **Success**: Verifies correct state transitions and data handling during rating submission.
- **Error Handling**: Simulates API failure and checks error handling.


### 6. Logout Service

####  [logoutUser](../src/entities/User/model/services/logoutUser/logoutUser.ts)
- **Logout Process**: Verifies correct dispatching of logout actions and clearing of user data.
- **Error Handling**: Tests failure scenarios and ensures correct handling without altering local storage.






## Tests for Services

### 1. `loginByUsername` Async Thunk Tests
- **Success login test**: Valid credentials dispatch `userActions.setAuthData`, make an API call, and resolve with authenticated user data (`fulfilled` status).
- **Error login with empty username**: Rejects with an error message and verifies the correct number of dispatches when username is empty.
- **Error login with missing password**: Rejects with an error message and verifies dispatches when the password is missing.
- **Error login with wrong credentials**: Handles incorrect credentials by rejecting with an error message and checks the API call and rejection status.
- **Error login with missing data in response**: Rejects when the API response is missing data.
- **Network error during login**: Handles network errors by rejecting with the correct error message.
- **Error login with unexpected server response**: Handles unexpected server responses by rejecting with an error message.
- **Server error during login (500)**: Handles server errors by rejecting with the correct error message.
- **Multiple simultaneous login requests**: Ensures correct handling of multiple login requests, each resulting in `fulfilled` status.

### 2. `fetchProfileData` Async Thunk Tests
- **Success fetching profile data**: Makes an API call, dispatches the result, and resolves with fetched data (`fulfilled` status).
- **Error fetching profile data with 403 status**: Rejects with an error message when the API returns a 403 status.
- **Error fetching profile data with network error**: Handles network errors by rejecting with an error message.
- **Error fetching profile data with missing data**: Rejects when the API response contains no data.
- **Multiple simultaneous profile data fetch requests**: Handles multiple requests, each resolving with correct data.

### 3. `updateProfileData` Async Thunk Tests
- **Success updating profile data**: Makes an API call to update the profile, dispatches the result, and resolves with updated data (`fulfilled` status).
- **Error updating profile data with 403 status**: Rejects with an error message when the API returns a 403 status.
- **Validate error with incorrect user data**: Rejects with `INCORRECT_USER_DATA` when profile data contains invalid fields.
- **Error with multiple validation issues**: Rejects with relevant validation errors when profile data has multiple issues.
- **Error updating profile data with network error**: Handles network errors by rejecting with an error message.
- **Error updating profile data with missing data in response**: Rejects with `SERVER_ERROR` when the API response is missing data.
- **Multiple simultaneous profile update requests**: Handles multiple requests, each resolving with correct data.
- **Error with incomplete profile data but valid according to validation rules**: Resolves with incomplete but valid data.
- **Error when profile ID is missing**: Rejects with `INCORRECT_USER_DATA` when the profile ID is missing.
- **Error updating profile data with 401 status**: Handles 401 errors by rejecting with `SERVER_ERROR`.

### 4. `validateProfileData` Function Tests
- **Valid profile data**: Returns an empty array for no validation errors.
- **Missing firstname and lastname**: Returns `INCORRECT_USER_DATA` when both are empty.
- **Missing username**: Returns `INCORRECT_USERNAME` when the username is empty.
- **Missing age**: Returns `INCORRECT_AGE` when age is undefined.
- **Age is not an integer**: Returns `INCORRECT_AGE` when age is non-integer.
- **Incorrect all**: Returns all relevant validation errors for incorrect or missing fields.
- **Profile with only correct username**: Returns errors for fields other than username.
- **Profile with valid data but empty profile object**: Returns errors for all missing fields.
- **Profile with valid fields but missing profile object**: Returns `NO_DATA` when no profile object is provided.

### 5. `fetchArticleById` Thunk Tests
- **Successfully fetches an article**: Resolves with article data (`fulfilled` status) when API call is successful.
- **Error when article is not found**: Rejects with an error message when the article is not found (`rejected` status).
- **Error when API call fails**: Handles API failures by rejecting with an error message.
- **Error when article ID is missing**: Rejects with an error message when the article ID is missing.

### 6. `fetchCommentsByArticleId` Thunk Tests
- **Success - Returns comments**: Resolves with comments data (`fulfilled` status) when API call is successful.
- **Error - No comments found**: Rejects with an error message when no comments are found (`rejected` status).
- **Error - API failure**: Handles API failures by rejecting with an error message.
- **Error - Missing article ID**: Rejects with an error message when the article ID is missing.

### 7. `addCommentForArticle` Thunk Tests
- **Successfully adds a comment**: Posts a new comment and dispatches appropriate actions on success.
- **Error when user data is missing**: Rejects with an error message without making an API call when user data is missing.
- **Error when article details are missing**: Rejects with a specific error message when article details are missing.
- **Error when comment text is missing**: Rejects with an error message when comment text is missing.
- **Error when API call fails**: Handles API call failures by rejecting with the error message.
- **Error with missing data in response**: Rejects with an error message when API response lacks expected data.

### 8. `fetchArticlesList` Thunk Tests
- **Should fetch articles list successfully**: Fetches a list of articles with the correct parameters.
- **Should handle empty response**: Rejects with "No articles found." when the API returns an empty response.
- **Should handle different edge cases**: Handles various edge cases by testing different combinations of page settings, sort orders, and filters.
- **Should handle API error scenario**: Handles API errors by rejecting with "Failed to fetch articles."

### 9. `initArticlesPage` Thunk Tests
- **Should initialize page and fetch articles when not already inited**: Initializes the articles page and fetches articles when not already initialized.
- **Should not dispatch any actions if the page is already initialized**: Avoids unnecessary actions when the page is already initialized.

### 10. `fetchNextArticlesPage` Thunk Tests
- **Successfully fetches the next page**: Increments the page number and fetches the next page of articles.
- **Does not fetch when `hasMore` is false**: Avoids fetching additional articles when `hasMore` is false.
- **Does not fetch when `isLoading` is true**: Avoids fetching the next page when already loading.
- **Increments page number correctly**: Ensures correct page number increment and fetches articles.
- **Handles edge case where `hasMore` is undefined**: Avoids fetching additional pages when `hasMore` is `undefined`.

### 11. `getUserDataById` API Call Tests
- **should make correct request**: Verifies correct API request structure without `Authorization` header.
- **should handle successful response**: Handles successful response and ensures returned data matches expected user data.
- **should handle unsuccessful response**: Handles errors correctly and ensures appropriate error message is captured.

### 12. `setJsonSettings` API Call Tests
- **should make correct request**: Ensures correct API request structure with appropriate JSON body.
- **should handle successful response**: Verifies successful mutation and ensures returned data matches expected structure.
- **should handle unsuccessful response**: Handles errors correctly and captures appropriate error message.

### 13. `getArticleRating` API Call Tests
- **Request is correct**: Ensures correct API request structure.
- **Successful response**: Handles successful response and ensures returned data matches expected rating data.
- **Unsuccessful response**: Handles errors correctly and captures appropriate error message.

### 14. `useGetArticleRating` Hook Tests
- **Successful response**: Verifies correct state updates upon successful API response.
- **Internal server error**: Handles errors within the hook and sets error state correctly.

### 15. `useRateArticle` Hook Tests
- **Successful response**: Ensures correct state transitions during and after rating submission.
- **Internal server error**: Handles API errors and updates state accordingly.

### 16. `useArticleRecommendationsList` Hook Tests
- **Fetch and return article recommendations successfully**: Verifies successful fetching and state updates.
- **Handle error when fetching article recommendations**: Handles errors during fetching and sets error state correctly.

### 17. `logoutUser` Async Thunk Tests
- **Dispatch logout action and clear storage**: Verifies correct dispatch of `userActions.logout()` and clearing of local storage.
- **Handle logout failure**: Ensures correct handling of logout failures and verifies local storage remains unchanged.






##  Tests for Services

1. **Test for [loginByUsername](../src/features/AuthByUsername/model/services/loginByUsername/loginByUsername.test.ts) async thunk**:

   - **Success login test**: Ensures that when valid user credentials are provided, the thunk correctly dispatches the `userActions.setAuthData` action, makes the API call, and resolves with the authenticated user data. The status of the result is `fulfilled`.

   - **Error login with empty username**: Verifies that the thunk rejects with the appropriate error message when the username is empty. It also checks that the correct number of dispatches is made.

   - **Error login with missing password**: Confirms that the thunk rejects with the expected error message when the password is missing, and verifies the number of dispatches.

   - **Error login with wrong credentials**: Ensures that the thunk handles incorrect credentials by rejecting the request with the appropriate error message. The test checks the API call and the rejection status.

   - **Error login with missing data in response**: Tests the scenario where the API response is missing data, ensuring the thunk correctly rejects with an appropriate error message.

   - **Network error during login**: Verifies that a network error during the login attempt is properly handled, with the thunk rejecting and returning the correct error message.

   - **Error login with unexpected server response**: Ensures that the thunk handles an unexpected server response correctly by rejecting the request with the appropriate error message.

   - **Server error during login (500)**: Confirms that the thunk handles a server error (HTTP 500) by rejecting with the correct error message and making the appropriate number of dispatches.

   - **Multiple simultaneous login requests**: Tests that multiple simultaneous login requests are handled correctly, with each request resulting in a `fulfilled` status and returning the correct user data.


2. **Test for [fetchProfileData](../src/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData.test.ts) async thunk**:

   - **Success fetching profile data**: Ensures that when a valid profile ID is provided, the thunk correctly makes an API call to fetch the profile data, dispatches the result, and resolves with the fetched data. The status of the result is `fulfilled`.

   - **Error fetching profile data with 403 status**: Verifies that if the API returns a 403 status, the thunk rejects with the appropriate error message and ensures that the API call was made with the correct endpoint.

   - **Error fetching profile data with network error**: Confirms that a network error during the fetch request is properly handled by rejecting with the correct error message and verifying the API call.

   - **Error fetching profile data with missing data**: Tests that if the API response contains no data, the thunk rejects with the appropriate error message and ensures the API call was made correctly.

   - **Multiple simultaneous profile data fetch requests**: Validates that multiple simultaneous fetch requests are handled correctly, with each request resulting in a `fulfilled` status and returning the correct profile data. The test also checks that the API call was made the expected number of times.


3. **Test for [updateProfileData](../src/features/editableProfileCard/model/services/updateProfileData/updateProfileData.test.ts) async thunk**:

   - **Success updating profile data**: Ensures that when valid profile data is provided, the thunk successfully makes an API call to update the profile, dispatches the result, and resolves with the updated profile data. The status of the result is `fulfilled`.

   - **Error updating profile data with 403 status**: Verifies that if the API returns a 403 status, the thunk rejects with the appropriate error message, and confirms that the API call was made with the correct endpoint.

   - **Validate error with incorrect user data**: Tests that if the profile data contains invalid fields (e.g., empty lastname), the thunk rejects with the `INCORRECT_USER_DATA` validation error.

   - **Error with multiple validation issues**: Validates that if the profile data has multiple validation issues (e.g., empty firstname, username, and undefined age), the thunk rejects with all relevant validation errors.

   - **Error updating profile data with network error**: Ensures that a network error during the update request is handled correctly by rejecting with the appropriate error message, and verifies that the API call was made with the correct endpoint.

   - **Error updating profile data with missing data in response**: Confirms that if the API response contains no data, the thunk rejects with the `SERVER_ERROR` validation error and checks that the API call was made correctly.

   - **Multiple simultaneous profile update requests**: Validates that multiple simultaneous update requests are handled correctly, with each request resulting in a `fulfilled` status and returning the correct profile data. The test also ensures that the API call was made the expected number of times.

   - **Error with incomplete profile data but valid according to validation rules**: Tests that if the profile data is incomplete (e.g., missing city) but still valid according to validation rules, the thunk resolves with the incomplete data.

   - **Error when profile id is missing**: Verifies that if the profile data lacks an ID, the thunk rejects with the `INCORRECT_USER_DATA` validation error and does not make an API call.

   - **Error updating profile data with 401 status**: Ensures that if the API returns a 401 status, the thunk rejects with the `SERVER_ERROR` validation error and verifies the correct handling of the API call.


4. **Test for [validateProfileData](../src/features/editableProfileCard/model/services/validateProfileData/validateProfileData.test.ts) function**:

   - **Valid profile data**: Ensures that when valid profile data is provided, the function returns an empty array indicating no validation errors.

   - **Missing firstname and lastname**: Verifies that if both `firstname` and `lastname` are empty, the function returns the `INCORRECT_USER_DATA` validation error.

   - **Missing username**: Tests that if the `username` field is empty, the function returns the `INCORRECT_USERNAME` validation error.

   - **Missing age**: Validates that if the `age` field is undefined, the function returns the `INCORRECT_AGE` validation error.

   - **Age is not an integer**: Confirms that if the `age` field is a non-integer value (e.g., 25.5), the function returns the `INCORRECT_AGE` validation error.

   - **Incorrect all**: Checks that if all profile fields are incorrect or missing, the function returns a comprehensive list of validation errors, including `INCORRECT_USER_DATA`, `INCORRECT_USERNAME`, and `INCORRECT_AGE`.

   - **Profile with only correct username**: Verifies that when only the `username` is valid but other fields (e.g., `firstname`, `lastname`, `age`) are incorrect, the function returns the corresponding validation errors.

   - **Profile with valid data but empty profile object**: Ensures that if the profile object contains valid fields but is otherwise empty, the function returns errors for all the missing fields.

   - **Profile with valid fields but missing profile object**: Tests that if no profile object is provided (i.e., `undefined`), the function returns the `NO_DATA` validation error.


5. **Test for [fetchArticleById](../src/entities/Article/model/services/fetchArticleById/fetchArticleById.test.ts) thunk**:

   - **Successfully fetches an article**: Verifies that when the API call is successful and returns valid article data, the `fetchArticleById` thunk correctly resolves with the article data and the request status is `fulfilled`.

   - **Error when article is not found**: Ensures that if the API returns a response with no data (indicating the article was not found), the thunk handles this by rejecting with an appropriate error message, and the request status is `rejected`.

   - **Error when API call fails**: Tests that if the API call fails (e.g., network error), the thunk rejects with an error message indicating the failure, and the request status is `rejected`.

   - **Error when article ID is missing**: Confirms that if the provided article ID is `undefined`, the thunk rejects with an error message indicating that the article ID is required, and the request status is `rejected`.


6. **Test for [fetchCommentsByArticleId](../src/features/ArticleComments/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId.ts) thunk**:

   - **Success - Returns comments**: Verifies that when the API call is successful and returns comments data, the `fetchCommentsByArticleId` thunk correctly resolves with the comments data and the request status is `fulfilled`.

   - **Error - No comments found**: Ensures that if the API returns a response with no data (indicating no comments were found), the thunk handles this by rejecting with an appropriate error message, and the request status is `rejected`.

   - **Error - API failure**: Tests that if the API call fails (e.g., network error), the thunk rejects with an error message indicating the failure to fetch comments, and the request status is `rejected`.

   - **Error - Missing article ID**: Confirms that if the provided article ID is `undefined`, the thunk rejects with an error message indicating that the article ID is required, and the request status is `rejected`.


7. **Test for [addCommentForArticle](../src/features/ArticleComments/model/services/addCommentForArticle/addCommentForArticle.test.ts) thunk**:

   - **Successfully adds a comment**: This test verifies that the `addCommentForArticle` thunk correctly posts a new comment when provided with valid user data, article details, and comment text. It checks that the API call is made with the correct parameters and that the thunk dispatches the appropriate actions on success.

   - **Error when user data is missing**: This test ensures that the thunk handles the case where user data is missing. It checks that the thunk rejects with an appropriate error message without making an API call.

   - **Error when article details are missing**: This test verifies that the thunk correctly handles scenarios where article details are missing. It ensures that the thunk does not attempt to post a comment and instead rejects with a specific error message.

   - **Error when comment text is missing**: This test confirms that the thunk handles the case where the comment text is missing. It ensures that the thunk rejects with an error message indicating the absence of required data.

   - **Error when API call fails**: This test simulates a failure in the API call to post the comment. It checks that the thunk correctly rejects with the error message returned by the failed API call.

   - **Error with missing data in response**: This test checks that the thunk handles the scenario where the API response does not include the expected data. It verifies that the thunk rejects with an appropriate error message when no data is returned from the API.


8. **Test for [fetchArticlesList](../src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts) thunk**:

   - **Should fetch articles list successfully**: This test ensures that the thunk successfully fetches a list of articles with the correct parameters based on the current page settings and filters. It checks that the API is called with the appropriate parameters and that the response is handled correctly, with the thunk resolving to the expected articles data.

   - **Should handle empty response**: This test validates the thunk's behavior when the API returns an empty response. The test ensures that the thunk rejects the promise with a "No articles found." message when no data is returned from the API.

   - **Should handle different edge cases**: This test examines the thunk's ability to handle various edge cases by testing different combinations of page settings, sort orders, and filters. It ensures that the API is called with the correct parameters and that the thunk processes the response correctly, returning the expected articles data.

   - **Should handle API error scenario**: This test simulates an API error scenario where the API call fails, and an error is thrown. The test ensures that the thunk handles the error properly by rejecting the promise with the error message "Failed to fetch articles."


9. **Test for [initArticlesPage](../src/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage.test.ts) thunk**:

   - **Should initialize page and fetch articles when not already inited**: This test verifies that the `initArticlesPage` thunk initializes the articles page correctly when it is not already initialized. It checks that the thunk dispatches the appropriate actions based on URL search parameters, such as setting the order, sort field, search term, and category. The test also ensures that the page state is initialized with the correct view mode from local storage and that the `fetchArticlesList` thunk is dispatched to load the articles.

   - **Should not dispatch any actions if the page is already initialized**: This test confirms that the `initArticlesPage` thunk does not perform any unnecessary actions when the articles page is already initialized. It ensures that no actions related to setting page parameters or fetching articles are dispatched if the page is marked as initialized in the state.

 
10. **Test for [fetchNextArticlesPage](../src/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage.test.ts) thunk**:

   - **Successfully fetches the next page**: This test checks if the thunk correctly increments the page number and triggers the fetch for the next page of articles when `hasMore` is true and `isLoading` is false. The test verifies that the `setPage` action is dispatched with the incremented page number and that the `fetchArticlesList` is called.

   - **Does not fetch when `hasMore` is false**: This test ensures that if `hasMore` is false (indicating no more pages are available), the thunk does not proceed to fetch additional articles. It also verifies that the `setPage` action is not dispatched.

   - **Does not fetch when `isLoading` is true**: This test validates that the thunk does not attempt to fetch the next page of articles if the current state is already loading (`isLoading` is true). It checks that the `fetchArticlesList` is not called and that the page number is not incremented.

   - **Increments page number correctly**: This test verifies that the thunk correctly increments the page number when more pages are available and not currently loading. It ensures that the page number is updated and the articles list is fetched.

   - **Handles edge case where `hasMore` is undefined**: This test addresses a potential edge case where the `hasMore` value is `undefined`. The test ensures that under these conditions, the thunk does not proceed with fetching additional pages and does not increment the page number.


11. **Tests for [getUserDataById](../src/entities/User/api/userApi.test.ts) API call**:

   - **should make correct request**: This test verifies that the API call made by the `getUserDataByIdQuery` query is correctly structured. It checks that the request method is `GET`, the URL is properly constructed with the user ID, and that the `Authorization` header is not set in this request.

   - **should handle successful response**: This test checks that when the API successfully returns user data, the response is handled correctly. It ensures that the action status is `fulfilled`, the operation is marked as successful, and the returned data matches the expected user data.

   - **should handle unsuccessful response**: This test simulates a failed API request and verifies that the error is correctly handled. It ensures that the action status is `rejected`, the operation is marked as an error, and the appropriate error message is captured.


12. **Tests for [setJsonSettings](../src/entities/User/api/userApi.test.ts) API call**:

   - **should make correct request**: This test ensures that the API call made by the `setJsonSettingsMutation` mutation is correctly structured. It checks that the request method is `PATCH`, the URL includes the correct user ID, and the JSON body contains the correct settings data.

   - **should handle successful response**: This test verifies that the API correctly updates the user's JSON settings and returns the updated user data. It checks that the mutation is successful and that the returned data matches the expected structure, including the updated JSON settings.

   - **should handle unsuccessful response**: This test simulates a failed API request and checks that the error is properly handled. It ensures that the mutation status is `rejected`, the error message is correctly captured, and the appropriate error status is returned.


13. **Tests for [getArticleRating](../src/features/articleRating/api/articleRatingApi.test.tsx) API call**:

   - **Request is correct**: This test verifies that the API call made by `getArticleRating` is structured correctly. It checks that the request method is `GET`, the URL is correctly formed with the provided `userId` and `articleId` as query parameters, and that the `Authorization` header is not set in this request.

   - **Successful response**: This test checks that when the API successfully returns the article ratings, the response is handled correctly. It ensures that the action status is `fulfilled`, the operation is marked as successful, and the returned data matches the expected rating data.

   - **Unsuccessful response**: This test simulates a failed API request and verifies that the error is correctly handled. It ensures that the action status is `rejected`, the operation is marked as an error, and the appropriate error message is captured.


14. **Tests for [useGetArticleRating](../src/features/articleRating/api/articleRatingApi.test.tsx) hook**:

   - **Successful response**: This test checks the `useGetArticleRating` hook's behavior when the API successfully returns article ratings. It verifies that the initial state shows loading, and upon receiving data, the state updates correctly with the ratings and the loading status is set to false.

   - **Internal server error**: This test simulates an API failure within the `useGetArticleRating` hook. It ensures that the hook properly handles the error, setting the error state to true and disabling the loading indicator.


15. **Tests for [useRateArticle](../src/features/articleRating/api/articleRatingApi.test.tsx) hook**:

   - **Successful response**: This test checks the `useRateArticle` hook when a rating is successfully submitted to the API. It verifies that the initial state is not loading, transitions to a loading state during the request, and finally updates to a success state upon completion.

   - **Internal server error**: This test simulates an API failure when submitting a rating using the `useRateArticle` hook. It ensures that the hook handles the error by setting the error state and disabling the loading indicator after the failed request.


16. **Tests for [useArticleRecommendationsList](../src/features/articleRecommendationsList/api/articleRecommendationsApi.test.tsx) hook**:

   - **Fetch and return article recommendations successfully**: This test verifies that the `useArticleRecommendationsList` hook successfully fetches and returns article recommendations based on the provided parameters. Initially, it checks that the hook is in a loading state and no data is available. After the data is fetched, the test ensures that the loading state is disabled, the operation is marked as successful, and the returned data matches the expected list of articles.

   - **Handle error when fetching article recommendations**: This test simulates an error during the fetching process and verifies that the `useArticleRecommendationsList` hook handles the error appropriately. It checks that the hook is initially in a loading state and then updates to an error state once the fetch operation fails. The test ensures that the `isError` flag is set to true, and the status reflects the rejection of the request due to the network error.


17. **Tests for [logoutUser](../src/entities/User/model/services/logoutUser/logoutUser.ts) async thunk**:

   - **Dispatch logout action and clear storage**: This test verifies that the `logoutUser` async thunk correctly dispatches the `userActions.logout()` action and clears the user data from local storage. It sets a value in local storage to simulate an existing user session, calls the thunk, and then checks that the action was dispatched and the local storage was cleared.

   - **Handle logout failure**: This test ensures that the `logoutUser` async thunk handles errors correctly. It simulates a scenario where the logout process fails, verifies that the thunk's result reflects a rejected status with an appropriate error message, and checks that the local storage remains unchanged after the failed logout attempt.
