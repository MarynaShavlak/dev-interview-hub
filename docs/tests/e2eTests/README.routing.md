# Tests for Routing

## [E2E testing](../../../cypress/e2e/common/routing.cy.ts)

### Unauthenticated User
- **Main Page Navigation**: Ensures that unauthenticated users are redirected to the main page.
- **Profile Page Navigation**: Confirms that unauthenticated users attempting to access a profile page are redirected to the main page.
- **Non-existent Route Handling**: Verifies that a non-existent route leads to the "Not Found" page.

### Authenticated User
- **Profile Page Access**: Validates that authenticated users can successfully navigate to the profile page.
- **Articles Page Access**: Confirms that authenticated users can access the articles page.

### Cleanup
- **Session Logout**: Ensures the user is logged out after each test to prevent session conflicts.
