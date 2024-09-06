# Tests for Articles List

## [E2E testing](../../..cypress/e2e/article/articles-list.cy.ts)

### Articles List Page
- **Successful Load**: Confirms that the articles list page loads with multiple articles.
- **Article Search**: Ensures that the search functionality works, displaying articles that match the search query.
- **Category Filter**: Verifies that articles can be filtered by category and that the results match the selected category.
- **Sorting by Views (Ascending)**: Ensures articles can be sorted by the number of views in ascending order.
- **Sorting by Views (Descending)**: Confirms articles can be sorted by the number of views in descending order.

### Cleanup
- **Article Removal**: Removes the article created during the test to maintain a clean state.

