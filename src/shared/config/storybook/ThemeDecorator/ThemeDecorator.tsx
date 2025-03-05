import { Story } from '@storybook/react';
// eslint-disable-next-line ms-production-project-plugin/layer-imports
import { I18nextProvider } from 'react-i18next';
// eslint-disable-next-line ms-production-project-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
import i18nForTests from '../../i18n/i18nForTests';

/**
 * The `ThemeDecorator` is a Storybook decorator that wraps components in a `ThemeProvider` to allow them to be rendered with a specified theme.
 * It also adds styling to the root `div`, ensuring the Storybook preview reflects the chosen theme correctly.
 *
 * @param theme - The theme to be applied, typically either `light` or `dark`, based on the `Theme` enum.
 *
 * @returns A function that takes a Storybook component (`StoryComponent`) and wraps it inside a `ThemeProvider`,
 *          applying the given theme and setting up some base styles for proper layout in Storybook.
 *
 */

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <I18nextProvider i18n={i18nForTests}>
            <div
                className={`app ${theme}`}
                style={{
                    padding: '20px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                <StoryComponent />
            </div>
        </I18nextProvider>
    </ThemeProvider>
);
