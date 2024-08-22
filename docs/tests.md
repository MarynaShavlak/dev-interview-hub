# Tests

The project uses four types of tests:
1) Regular unit tests with Jest - `npm run test:unit`
2) Component tests with React Testing Library - `npm run test:unit`
3) Screenshot testing with Loki - `npm run test:ui`
4) e2e (end-to-end) testing with Cypress - `npm run test:e2e`



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
