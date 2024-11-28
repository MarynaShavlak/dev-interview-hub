# Service Tests

## 1. AuthByUsername Service

### [loginByEmailThunk](../../../src/features/AuthByUsername/model/services/loginByEmailThunk/loginByEmailThunk.test.ts)
- **Success**: Validates successful login with correct credentials.
- **Error Handling**: Covers scenarios such as empty username, missing password, wrong credentials, incomplete response data, network issues, unexpected server responses, and server errors (500).
- **Simultaneous Requests**: Tests the handling of multiple login requests.

## 2. EditableProfileCard Service

### [fetchProfileData](../../../src/features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData.test.ts)
- **Success**: Ensures profile data is fetched successfully with a valid ID.
- **Error Handling**: Includes tests for 403 status, network errors, missing response data, and simultaneous requests.

### [updateProfileData](../../../src/features/EditableProfileCard/model/services/updateUserProfileThunk/updateUserProfileThunk.test.ts)
- **Success**: Verifies profile data updates correctly.
- **Error Handling**: Covers 403 status, incorrect user data, multiple validation issues, network errors, missing response data, incomplete but valid data, missing profile ID, and 401 status.

### [validateProfileData](../../../src/features/EditableProfileCard/model/services/validateProfileData/validateProfileData.test.ts)
- **Validation Checks**: Tests various scenarios, including missing fields (firstname, lastname, username, age), non-integer age, incorrect fields, and empty/missing profile object.

## 3. Article Service

### [fetchArticleByIdThunk](../../../src/entities/Article/model/services/fetchArticleByIdThunk/fetchArticleByIdThunk.test.ts)
- **Success**: Confirms correct fetching of article data.
- **Error Handling**: Tests for missing article, API failures, and undefined article ID.

### [fetchCommentsByArticleIdThunk](../../../src/features/ArticleComments/model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk.ts)
- **Success**: Verifies successful retrieval of comments.
- **Error Handling**: Covers scenarios with no comments, API failures, and missing article ID.

### [addCommentForArticleThunk](../../../src/features/ArticleComments/model/services/addCommentForArticleThunk/addCommentForArticleThunk.test.ts)
- **Success**: Ensures comments are added successfully.
- **Error Handling**: Includes cases with missing user data, article details, comment text, API failures, and incomplete response data.

### [fetchArticlesList](../../../src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts)
- **Success**: Validates successful article list retrieval based on page settings and filters.
- **Error Handling**: Tests empty response, edge cases, and API

### [initArticlesPage](../../../src/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage.test.ts)
- **Initialization**: Verifies correct initialization of the articles page, dispatching appropriate actions and loading articles.
- **No Reinitialization**: Confirms no actions are dispatched if the page is already initialized.

### [fetchNextArticlesPage](../../../src/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage.test.ts)
- **Pagination**: Tests correct behavior for fetching the next page, including conditions when `hasMore` is false, `isLoading` is true, and handling of undefined `hasMore`.

###  [useArticleRecommendationsList](../../../src/features/ArticleRecommendationsList/api/articleRecommendationsApi.test.tsx) Hook
- **Success**: Ensures correct fetching and handling of article recommendations.
- **Error Handling**: Tests error scenarios during data fetching.

## 4. User Service

### [getUserDataById](../../../src/entities/User/api/userApi.test.ts)
- **Request Handling**: Tests correct request structure and handling of successful and unsuccessful responses.

### [setJsonSettings](../../../src/entities/User/api/userApi.test.ts)
- **Settings Update**: Validates correct API request structure, successful response handling, and error scenarios.

## 5. Article Rating Service

### [getArticleRating](../../../src/features/ArticleRating/api/articleRatingApi.test.tsx)
- **Request Validation**: Ensures correct API request structure and handling of successful and unsuccessful responses.

###  [useRateArticle](../../../src/features/ArticleRating/api/articleRatingApi.test.tsx) Hook
- **Success**: Tests correct loading state transitions and data handling.
- **Error Handling**: Covers API failure scenarios.

###  [useRateArticle](../../../src/features/ArticleRating/api/articleRatingApi.test.tsx) Hook
- **Success**: Verifies correct state transitions and data handling during rating submission.
- **Error Handling**: Simulates API failure and checks error handling.

## 6. Logout Service

###  [logoutUser](../../../src/entities/User/model/services/logoutUser/logoutUser.ts)
- **Logout Process**: Verifies correct dispatching of logout actions and clearing of user data.
- **Error Handling**: Tests failure scenarios and ensures correct handling without altering local storage.




