import { useContext } from 'react';
import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Custom hook to manage and toggle the theme of an application.
 * @returns {Object} An object containing:
 *   @property {Theme} theme - The current theme. Defaults to `Theme.LIGHT` if no theme is set.
 *   @property {Function} toggleTheme - A function to toggle the theme. It accepts an optional callback function `saveAction` that is called with the new theme as an argument after the theme is toggled.
 *
 *
 */

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        let newTheme: Theme;
        if (theme === undefined) {
            newTheme = Theme.LIGHT;
        } else {
            switch (theme) {
                case Theme.DARK:
                    newTheme = Theme.LIGHT;
                    break;
                case Theme.LIGHT:
                    newTheme = Theme.ORANGE;
                    break;
                case Theme.ORANGE:
                    newTheme = Theme.DARK;
                    break;
                default: {
                    const exhaustiveCheck: never = theme;
                    throw new Error(`Unhandled theme case: ${exhaustiveCheck}`);
                }
            }
        }

        setTheme?.(newTheme);
        saveAction?.(newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
