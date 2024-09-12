import { DecoratorFn } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import i18nForTests from '../../i18n/i18nForTests';

export const withI18nDecorator: DecoratorFn = (Story) => (
    <I18nextProvider i18n={i18nForTests}>
        <Story />
    </I18nextProvider>
);
