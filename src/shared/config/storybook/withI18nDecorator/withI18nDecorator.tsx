import { DecoratorFn } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import i18nForTests from '../../i18n/i18nForTests';

/**
 * The `withI18nDecorator` is a Storybook decorator that wraps components in an `I18nextProvider` to enable internationalization
 * support. It uses a pre-configured i18n instance (`i18nForTests`) to ensure consistent translation functionality during testing.
 *
 * @param Story - A function that returns the Storybook component (`Story`) to be rendered with internationalization support.
 *
 * @returns The `Story` wrapped in an `I18nextProvider` component, providing translation capabilities and ensuring that i18n features
 *          are available during Storybook rendering.
 *
 * Usage: Apply this decorator to test components with internationalization support, ensuring that translations are correctly applied
 *        in Storybook stories.
 */

export const withI18nDecorator: DecoratorFn = (Story) => (
    <I18nextProvider i18n={i18nForTests}>
        <Story />
    </I18nextProvider>
);
