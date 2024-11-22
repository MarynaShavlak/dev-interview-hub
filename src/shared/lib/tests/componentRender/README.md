### Documentation for Testing Utilities: `TestProvider` component and `componentRender` function

## Overview

The `TestProvider` component and `componentRender` function are utilities designed to simplify testing React components by providing a comprehensive and pre-configured testing environment. These utilities wrap the component under test with essential providers for routing, state management, theming, and internationalization. This helps developers accurately simulate real-world application behavior in tests.

## Role and Purpose

The `componentRender` function and `T`estProvider` component eliminate the need to manually set up multiple providers when testing components that rely on routing, Redux state, themes, or translations. By automatically configuring the necessary environment, they streamline testing for components that interact with these features, ensuring reliable and consistent test results.
## Problem Addressed

Testing React components that depend on various contexts (like routing, Redux, and internationalization) often requires tedious setup. Common issues include:
1. **Routing Setup:** Ensuring that components render correctly based on different routes.
2. **State Management:** Providing a Redux store with initial state and asynchronous reducers.
3. **Internationalization:** Configuring translations to test localization features.
4. **Theming**: Ensuring components render correctly in different themes (e.g., light and dark).

## Solution

The `componentRender` function addresses these problems by:
1. **Automatic Provider Wrapping**: Automatically wrapping components with MemoryRouter, StoreProvider, I18nextProvider, and ThemeProvider to reduce boilerplate.
2. **Flexible Configuration**: Supporting configuration options for initial state, asynchronous reducers, route, and theme, allowing tailored test scenarios.
3. **Realistic Environment**: Simulating a real-world application environment to help catch issues early in the development process, such as routing problems, state inconsistencies, or theming errors.
## Implementation Details

### Props

| Prop           | Type                 | Required / Optional | Description                                                                                         |
|----------------|----------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `component`    | `ReactNode`          | Required            | The React element or component to be rendered and tested.                                           |
| `options`      | `componentRenderOptions` | Optional            | Configuration object that allows specifying route, initial state, and asynchronous reducers.       |

### `componentRenderOptions`

| Option         | Type                                    | Default     | Description                                                                                        |
|----------------|-----------------------------------------|-------------|----------------------------------------------------------------------------------------------------|
| `route`        | `string`                                | `'/'`       | The initial route for the `MemoryRouter`.                                                         |
| `initialState` | `DeepPartial<StateSchema>`              | `undefined` | Initial state for the Redux store.                                                                 |
| `asyncReducers`| `DeepPartial<ReducersMapObject<StateSchema>>` | `undefined` | Asynchronous reducers to be applied to the Redux store.                                            |
| `theme`| `Theme` | `Theme.LIGHT` | Specifies the theme (light or dark) for testing components with theme-based styling.|

### Internal Work

1. **MemoryRouter**: Simulates browser routing, allowing tests to run in different route contexts.
2. **StoreProvider**: Injects Redux state management, including initial state and dynamically loaded reducers.
3. **I18nextProvider**: Handles translations by wrapping the component with internationalization context, enabling tests for multilingual components.
4. **ThemeProvider**: Applies theming (light or dark), allowing components to be tested for theme-specific behavior and styles.

## Usage Example

### Example 1: Test Case Setup in RTL tests

```typescript jsx
import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from '../Sidebar/Sidebar';

describe('Sidebar Component', () => {
    test('should render the Sidebar component', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('should toggle collapse class when toggle button is clicked', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
```

### Example 2: Testing EditableProfileCard with Mocked Data in Cypress test case

```typescript jsx
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

describe('EditableProfileCard.cy.tsx', () => {
    it('should render EditableProfileCard with mocked profile data', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID, 
                            },
                        },
                                            },
                    theme: 'dark', 
                }}
            >
                <EditableProfileCard id={USER_ID} />
            </TestProvider>
        );

        // Assertions to validate component behavior after mount
        cy.get('[data-testid="profile-card"]').should('exist'); 
        cy.get('[data-testid="profile-name"]').should('contain.text', 'Test user');  
    });
});
```
## Conclusion
The `componentRender` function and `TestProvider` component are essential tools for testing React components that rely on complex contexts like routing, Redux state management, theming, and internationalization. By providing a ready-to-use, customizable environment, these utilities reduce setup complexity and ensure tests are accurate and maintainable. This allows developers to focus on writing meaningful tests while minimizing the risk of misconfigurations.
