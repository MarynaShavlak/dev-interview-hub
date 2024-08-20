import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';

/**
 * The `renderWithTranslation` function renders a React component within an i18next translation provider,
 * enabling internationalization support in tests. It wraps the provided component with the `I18nextProvider`
 * configured with `i18nForTests`, ensuring that translation features are available during rendering.
 *
 * @param component - The React element or component to be rendered and tested.
 *
 * @returns The result of the `render` function from `@testing-library/react`, which includes methods for interacting
 *          with the rendered component and querying the DOM.
 */

export const renderWithTranslation = (component: ReactNode) => {
    return render(
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>,
    );
};
