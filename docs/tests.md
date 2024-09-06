# Project Test Suite

The project uses four types of tests:

##  **Unit Tests with Jest**
- **Command**: `npm run test:unit`
- **Focus**: Regular unit testing for core functionality.
### Tests:
- [Tests for selectors](tests/unitTests/README.selectors.md)
- [Tests for slices](tests/unitTests/README.slices.md)
- [Tests for services](tests/unitTests/README.services.md)
- [Tests for components](tests/unitTests/README.components.md)
- [Tests for utility functions](tests/unitTests/README.utilities.md)

## **Component Tests with React Testing Library**
- **Command**: `npm run test:unit`
- **Focus**: Testing React components' behavior and rendering.

##  **Screenshot Testing with Loki**
- **Command**: `npm run test:ui`
- **Focus**: Visual regression testing to ensure UI consistency.

## End-to-End (E2E) Testing with Cypress**
- **Purpose**: E2E tests simulate real user interactions to verify that the application functions properly from the UI to the backend. These tests ensure critical features like login, article management, and profile updates work seamlessly in various scenarios.
  Component tests validate the behavior of individual components in isolation, ensuring they render and function as expected.
- **Command**: `npm run test:e2e`
- **Focus**: Comprehensive testing of user flows and interactions.
### Commands and Fixtures:
  - **Commands**: Custom Cypress commands like `createArticle`, `removeArticle`, and `login` simplify complex interactions by abstracting repetitive tasks, making tests cleaner and more maintainable.
  - **Fixtures**: Cypress fixtures (articles.json, profile.json, article-details.json) are used to mock API responses, ensuring consistent and faster tests by simulating real data scenarios without relying on live servers

### Tests Categories:
- [Tests for profile](tests/e2eTests/README.profile.md)
- [Tests for routing](tests/e2eTests/README.routing.md)
- [Tests for article details](tests/e2eTests/README.article-details.md)
- [Tests for articles list](tests/e2eTests/README.articles-list.md)
