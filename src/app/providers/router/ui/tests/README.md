# Testing 'AppRouter' Component
This document provides an overview and details of the tests written for the `AppRouter` component using `@testing-library/react`. The tests ensure that the `AppRouter'* behaves correctly under different scenarios, including rendering pages, handling unknown routes, managing authentication, and role-based access control.

## Test Dependencies
- `@testing-library/react`: A library for testing React components.
- `componentRender`: A custom utility function for rendering components with necessary context providers and initial state.
- `AppRouter`: The component under test.
- `getRouteAbout`, getRouteAdmin, getRouteProfile: Helper functions to generate route paths.
- `UserRole`: Enum defining user roles.

## Test Suite Overview
The test suite contains six test cases that verify the following:

1. Rendering a page.
2. Handling a "page not found" scenario.
3. Redirecting an unauthorized user to the main page.
4. Granting access to a protected page for an authenticated user.
5. Denying access to a restricted page when the user lacks the required role.
6. Allowing access to a restricted page when the user has the required role.


## Test Cases Description
| Test Case                                          | Purpose                                                                                                  | Implementation                                                                                                                               | Assertion                                         |
| -------------------------------------------------- |----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| Page Should Be Rendered                            | Verify that a specific page renders correctly.                                                           | Navigate to the **About page** route and check if the page element is present in the document.                                               | The **About** page should be in the document.     |
| Page Not Found                                     | Ensure the **"Not Found"** page is displayed for unknown routes.                                         | Navigate to a non-existent route and check if the **Not Found** page element is present in the document.                                     | The **Not Found** page should be in the document. |
| Redirect of an Unauthorized User to the Main Page  | Test if an unauthorized user is redirected to the **Main** page when trying to access a protected route. | Navigate to the **Profile** page route without authentication and check if the **Main** page element is present.                             | The **Main** page should be in the document.      |
| Access to a Closed Page for an Authorized User     | Verify that an authenticated user can access a protected route.                                          | Navigate to the **Profile** page route with authentication and check if the **Profile** page element is present.                             | The **Profile** page should be in the document.   |
| Access Denied (the Required Role Is Absent)        | Test if access is denied when the user lacks the required role.                                          | Navigate to the **Admin** page route with a user who does not have the necessary role and check if the **Forbidden** page element is present. | The **Forbidden** page should be in the document. |
| Access Is Allowed (the Required Role Is Present)   | Verify that a user with the required role can access a restricted route.                                 | Navigate to the **Admin** page route with a user who has the necessary role and check if the **Admi Panel** page element is present.         | The **Admin Panel** page should be in the document. |

## Conclusion
The test suite for `AppRouter` comprehensively checks the routing logic, ensuring that pages render correctly, unknown routes are handled, and access control works as expected for both authenticated and unauthorized users. These tests help maintain the integrity and reliability of the application's routing system.
