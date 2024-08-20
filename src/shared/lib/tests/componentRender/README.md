### `componentRender` Function

## Overview

The `componentRender` function is a utility designed to streamline the testing process for React components by providing a pre-configured environment with routing, state management, and internationalization. This function wraps the component under test with essential providers and renders it in a way that closely resembles how it will be used in a real application.

## Role and Purpose

The `componentRender` function simplifies the setup for testing React components that rely on multiple providers. By integrating `MemoryRouter` for routing, `StoreProvider` for Redux state management, and `I18nextProvider` for internationalization, it ensures that the component under test operates in an environment that mirrors the application's setup. This approach helps to catch potential issues related to routing, state management, and localization early in the development cycle.

## Problem Addressed

When testing React components, especially those that interact with routing, Redux state, or internationalization, setting up the environment for each test can be cumbersome and error-prone. Common issues include:
1. **Routing Setup:** Ensuring that components render correctly based on different routes.
2. **State Management:** Providing a Redux store with initial state and asynchronous reducers.
3. **Internationalization:** Configuring translations to test localization features.

## Solution

The `componentRender` function addresses these problems by:
1. **Simplified Rendering:** Automatically wraps the component with `MemoryRouter`, `StoreProvider`, and `I18nextProvider`, reducing boilerplate code.
2. **Flexible Configuration:** Accepts options for initial state, asynchronous reducers, and routes, allowing for customized test scenarios.
3. **Consistent Environment:** Provides a consistent and controlled environment for testing components with all necessary providers in place.

## Implementation Details

### Props

| Prop           | Type                 | Required / Optional | Description                                                                                         |
|----------------|----------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `component`    | `ReactNode`          | Required            | The React element or component to be rendered and tested.                                           |
| `options`      | `componentRenderOptions` | Optional            | Configuration object that allows specifying route, initial state, and asynchronous reducers.       |

### `componentRenderOptions`

| Option         | Type                                    | Default     | Description                                                                                         |
|----------------|-----------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| `route`        | `string`                                | `'/'`       | The initial route for the `MemoryRouter`.                                                          |
| `initialState` | `DeepPartial<StateSchema>`              | `undefined` | Initial state for the Redux store.                                                                  |
| `asyncReducers`| `DeepPartial<ReducersMapObject<StateSchema>>` | `undefined` | Asynchronous reducers to be applied to the Redux store.                                             |

### Internal Work

1. **`MemoryRouter`**: Provides routing capabilities for the component under test, simulating different URL paths.
2. **`StoreProvider`**: Supplies Redux store with initial state and optional asynchronous reducers.
3. **`I18nextProvider`**: Integrates internationalization, ensuring that the component receives the necessary translation context.

## Usage Example

### Test Case Setup

Here's an example of how to use `componentRender` to test a `Sidebar` component:

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
## Conclusion
The `componentRender` function is an essential tool for testing React components that require a complex environment. By providing a streamlined way to render components with routing, state management, and internationalization, it helps ensure that tests are accurate and consistent. This utility reduces setup complexity and allows developers to focus on writing effective tests for their components.
