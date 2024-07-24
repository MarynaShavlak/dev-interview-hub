import { createContext } from 'react';
import { Theme } from '../../const/theme';
/**
 * The `ThemeContext` is a React context that provides the current theme and a function to update the theme.
 * This is useful for managing and accessing the application's theme across different components.
 *
 * The context includes an interface `ThemeContextProps` which defines the shape of the context value.
 *
 * @interface ThemeContextProps
 * @property {Theme} [theme] - Optional. The current theme of the application, represented by the `Theme` enum.
 * @property {(theme: Theme) => void} [setTheme] - Optional. A function to update the current theme. It accepts a `Theme` enum value as an argument.
 *
 * */

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
