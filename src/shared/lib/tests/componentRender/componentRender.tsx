import { ReducersMapObject } from '@reduxjs/toolkit';
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line path-supervisor/layer-imports
import '@/app/styles/index.scss';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line path-supervisor/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line path-supervisor/layer-imports
import { userReducer } from '@/entities/User';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

/**
 * `TestProvider` is a utility component designed to simplify setting up a comprehensive testing environment
 * for React components. It provides necessary providers such as routing (`MemoryRouter`), state management
 * (`StoreProvider`), internationalization (`I18nextProvider`), and theming (`ThemeProvider`), creating
 * an environment similar to the actual app context.
 *
 * @param props - The properties passed to the `TestProvider` component.
 *
 * @param props.children - The React component(s) that will be wrapped by the `TestProvider` for testing.
 * @param props.options - An optional configuration object to customize the test environment:
 *   - `route` (optional): The initial route to be used by `MemoryRouter`, allowing route-based testing.
 *     Defaults to `'/'`.
 *   - `initialState` (optional): The initial Redux store state, which can be used to simulate specific
 *     app states in tests.
 *   - `asyncReducers` (optional): A collection of asynchronous Redux reducers that can be dynamically injected
 *     into the store. This is helpful when testing components that rely on lazy-loaded or injected reducers.
 *   - `theme` (optional): The UI theme for the component under test, applied through the `ThemeProvider`.
 *     Possible values are `Theme.LIGHT` (default) or `Theme.DARK`.
 *
 * @returns A React element that wraps the provided `children` with the specified providers, creating
 *          an environment suitable for unit testing.
 *

 */

export const TestProvider = (props: TestProviderProps) => {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
};

/**
 * The `componentRender` function simplifies rendering a React component within a controlled testing environment.
 * It wraps the provided component with essential context providers, such as routing, Redux state management,
 * theming, and internationalization, making it easier to test components that rely on these dependencies.
 *
 * @param component - The React component or element to be rendered for testing.
 * @param options - An optional configuration object to customize the test environment.
 *                  - `route` (optional): The initial URL for the `MemoryRouter`, allowing for route-specific tests. Defaults to `'/'`.
 *                  - `initialState` (optional): The initial state object for the Redux store. Useful for testing components
 *                    with a predefined state.
 *                  - `asyncReducers` (optional): A set of asynchronous reducers to include in the Redux store. This is useful
 *                    for testing components that use lazy-loaded or dynamically injected reducers.
 *                  - `theme` (optional): Specifies the UI theme (light or dark) by setting the `ThemeProvider`. Defaults to `Theme.LIGHT`.
 *
 * @returns The result of React Testing Library's `render` function, which includes utility methods like `getByText`,
 *          `queryByTestId`, etc., for interacting with the rendered component in tests.
 *          The component will be wrapped with `MemoryRouter`, `StoreProvider`, `ThemeProvider`, and `I18nextProvider`.
 */

export const componentRender = (
    component: ReactNode,
    options: componentRenderOptions = {},
) => {
    const defaultAsyncReducers = {
        user: userReducer, // Add the user reducer here
    };
    // return render(<TestProvider options={options}>{component}</TestProvider>);
    return render(
        <TestProvider
            options={{
                ...options,
                asyncReducers: {
                    ...defaultAsyncReducers,
                    ...options.asyncReducers,
                },
            }}
        >
            {component}
        </TestProvider>,
    );
};
