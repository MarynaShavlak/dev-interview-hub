# Project Test Suite

The project uses four types of tests:

##  **Unit Tests with Jest**
- **Purpose**: Unit tests with Jest focus on verifying the functionality of functions, and modules in isolation. This ensures that each unit of code performs correctly, catches bugs early, and supports refactoring by providing a safety net for changes.
- **Command**: `npm run test:unit`
- **Focus**: Unit testing for core functionality to ensure functions perform as expected.
- [Configuration details](../config/jest/README.md)

### Test Categories:
- [Selector Tests](tests/unitTests/README.selectors.md)
- [Slice Tests](tests/unitTests/README.slices.md)
- [Service Tests](tests/unitTests/README.services.md)
- [Utility Function Tests(tests/unitTests/README.utilities.md)

## **Component Tests with React Testing Library**
- **Purpose**: Component tests with React Testing Library focus on validating the behavior and rendering of React components. These tests ensure that components function correctly within the context of the application, capturing user interactions and verifying visual output.
- **Command**: `npm run test:unit`
- **Focus**: Testing React components' behavior and rendering.

- [Component Tests](tests/unitTests/README.components.md)


##  **Screenshot Testing with Loki**
- **Command**: `npm run test:ui`
- **Focus**: Visual regression testing to ensure UI consistency.

## End-to-End (E2E) Testing with Cypress
- **Purpose**: E2E tests simulate real user interactions to verify that the application functions properly from the UI to the backend. These tests ensure critical features like login, article management, and profile updates work seamlessly in various scenarios.
  Component tests validate the behavior of individual components in isolation, ensuring they render and function as expected.
- **Command**: `npm run test:e2e`
- **Focus**: Comprehensive testing of user flows and interactions.
- [Configuration details](../cypress/README.cypress.md)

### Commands and Fixtures:
  - **Commands**: Custom Cypress commands like `createArticle`, `removeArticle`, and `login` simplify complex interactions by abstracting repetitive tasks, making tests cleaner and more maintainable.
  - **Fixtures**: Cypress fixtures (articles.json, profile.json, article-details.json) are used to mock API responses, ensuring consistent and faster tests by simulating real data scenarios without relying on live servers

### Tests Categories:
- [Profile tests](tests/e2eTests/README.profile.md)
- [Routing Tests](tests/e2eTests/README.routing.md)
- [Article Details Tests](tests/e2eTests/README.article-details.md)
- [Articles List Tests](tests/e2eTests/README.articles-list.md)
