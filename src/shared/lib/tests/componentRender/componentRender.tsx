import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

/**
 * The `componentRender` function renders a React component within a pre-configured testing environment.
 * It wraps the component with necessary providers for routing, state management, and internationalization,
 * simplifying the setup for tests that require these features.
 *
 * @param component - The React element or component to be rendered and tested.
 * @param options - Configuration object for customizing the test environment.
 *                   - `route` (optional): Initial route for the `MemoryRouter`. Defaults to `'/'`.
 *                   - `initialState` (optional): Initial state for the Redux store.
 *                   - `asyncReducers` (optional): Async reducers to be used with the Redux store.
 *
 * @returns The rendered component wrapped with `MemoryRouter`, `StoreProvider`, and `I18nextProvider`.
 */

export const componentRender = (
    component: ReactNode,
    options: componentRenderOptions = {},
) => {
    const { route = '/', initialState, asyncReducers } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                initialState={initialState}
                asyncReducers={asyncReducers}
            >
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
};
