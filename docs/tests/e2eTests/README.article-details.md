# Tests for Article Details

## [E2E testing](../../../cypress/e2e/article/article-details.cy.ts)

### Article Page
- **Article Content Display**: Ensures the article content (Title, Creation Date, Image, Views) is displayed correctly after the user navigates to the article page.
- **Recommendations List Display**: Confirms the existence and correct display of the recommendations list on the article page.
- **Comment Functionality**: Verifies that users can successfully leave a comment and that the comment is displayed.
- **Rating Functionality**: Ensures users can rate the article, and the rating is properly reflected on the page.

### Cleanup
- **Article Removal**: After each test, the article created for testing is removed to ensure no residual data is left behind.
