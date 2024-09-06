# Tests for Profile 

## [E2E testing](../../../cypress/e2e/profile/profile-edit.cy.ts)
### Profile Load
-   **Login and Navigation**: Confirms successful login and navigation to the user's profile.
-   **Profile Data Check**: Verifies correct display of initial profile data (First Name, Last Name, Username, Age, City, Avatar).
### Profile Edit
- **Edit and Save**: Updates First and Last Name, confirming the changes are saved and displayed correctly.
### Cleanup
- **Profile Reset**: Resets profile to its original state after each test.

## [Component testing](../../../cypress/component/EditableProfileCard.cy.tsx)

### Setup
-   **Login and Mock Profile Data**: Mocks the API response for profile data and ensures the user is logged in before each test.
### Profile Rendering
-   **Render Profile with Initial Data**: Confirms that the EditableProfileCard renders correctly with initial values from the mocked profile, including First Name, Last Name, Username, Age, City, and Avatar.
### Profile Editing
-   **Edit and Save Profile Data**: Verifies that profile updates (First Name and Last Name) can be made, saved, and displayed correctly.
### Cleanup
-   **Profile Reset**: Resets the profile to its original state after each test to ensure data consistency.
