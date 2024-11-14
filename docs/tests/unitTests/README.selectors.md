# Selector Tests

The project includes comprehensive tests for selectors, ensuring they accurately extract and transform data from the state. Below is a breakdown of the selector tests.

## 1. Article Details Selectors

| Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
 | [articleDetails selectors](../../../src/entities/Article/model/selectors/articleDetails.test.ts) | Verifies that the selector correctly returns article details data from the state.         | Handles cases where the state is empty.    |
| [articleDetails selectors](../../../src/entities/Article/model/selectors/articleDetails.test.ts) | Ensures that the selector returns the error state for article details.                    | Manages scenarios where the state is empty.|
| [articleDetails selectors](../../../src/entities/Article/model/selectors/articleDetails.test.ts) | Confirms that the selector returns the loading state for article details.                 | Handles cases where the state is empty.    |

## 2. User Selectors

| Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
| [getUserAuthData](../../../src/entities/User/model/selectors/getUserAuthData/getUserAuthData.test.ts) | Verifies that the selector returns the authentication data for the user.                  | Handles scenarios with an empty state.     |
| [getUserInited](../../../src/entities/User/model/selectors/getUserInited/getUserInited.test.ts) | Ensures that the selector correctly returns the `_inited` value.                          | Handles empty state scenarios.             |
 | [getJsonSettings](../../../src/entities/User/model/selectors/getJsonSettings/getJsonSettings.test.ts) | Confirms that the selector returns the user's JSON settings from authentication data.     | Returns default settings when `authData` or state is empty. |
| [userSelectors.test.ts](../../../src/entities/User/model/selectors/roles/userSelectors.test.ts) | Checks if the selector correctly identifies if the user has an admin role.                | Handles cases with empty state.            |
| [userSelectors.test.ts](../../../src/entities/User/model/selectors/roles/userSelectors.test.ts) | Verifies that the selector accurately identifies if the user has a manager role.          | Handles non-admin, non-manager roles, and empty state scenarios. |

## 3. Login Form Selectors
| Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
 | [getLoginEmail](../../../src/features/AuthByUsername/model/selectors/getLoginEmail/getLoginEmail.test.ts) | Verifies that the selector correctly returns the username from the login form state.       | Handles cases with an empty state.         |
  | [getLoginPassword](../../../src/features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword.ts) | Ensures that the selector returns the password from the login form state.                  | Manages scenarios with an empty state.     |
 | [getLoginIsLoading](../../../src/features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading.test.ts) | Confirms that the selector correctly returns the loading state for the login form.         | Handles cases with an empty state.         |
| [getLoginError](../..//src/features/AuthByUsername/model/selectors/getLoginError/getLoginError.test.ts) | Verifies that the selector correctly returns the error message from the login form state.  | Manages cases where the state is empty.    |

## 4. Profile Selectors


 | Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
 | [getProfileData](../../../src/features/EditableProfileCard/model/selectors/getProfileData/getProfileData.test.ts) | Verifies that the selector correctly returns the profile data from the state.             | Handles cases with an empty state.         |
 | [getProfileError](../../../src/features/EditableProfileCard/model/selectors/getProfileError/getProfileError.test.ts) | Ensures that the selector returns the profile error from the state.                       | Handles scenarios where the state is empty.|
 | [getProfileForm](../../../src/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm.test.ts) | Confirms that the selector returns the profile form data.                                 | Handles cases where the state is empty.    |
  | [getProfileIsLoading](../../../src/features/EditableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading.test.ts) | Verifies that the selector correctly returns the loading status of the profile.           | Handles empty state scenarios.             |
 | [getProfileReadonly](../../../src/features/EditableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly.test.ts) | Ensures that the selector correctly returns the readonly status of the profile.           | Handles scenarios where the state is empty.|
 | [getProfileValidateErrors](../../../src/features/EditableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors.test.ts) | Confirms that the selector returns profile validation errors.                             | Handles cases where the state is empty.    |

## 5. Scroll Selectors

| Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
 | [getUIScroll](../../../src/widgets/Page/model/selectors/getUIScroll.test.ts) | Verifies that the selector correctly returns the entire scroll state from the state.       | Handles cases where the scroll state is missing or undefined. || [getUIScroll](../..//src/widgets/Page/model/selectors/getUIScroll.test.ts) | Confirms that the selector returns the scroll value for a given path.                      | Handles cases with unknown paths or missing scroll values. |

## 6. Article Edit Permission Selector

 | Selector  | Purpose                                                                                   | Edge Cases Handled                         |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------------------|
 | [getCanEditArticle](../../../src/pages/ArticleDetailsPage/model/selectors/getCanEditArticle/getCanEditArticle.test.ts) | Verifies that the selector returns `true` when the article's author matches the authenticated user, and `false` otherwise. | Handles cases where either article data or user data is missing, returning `false` in those scenarios. |

