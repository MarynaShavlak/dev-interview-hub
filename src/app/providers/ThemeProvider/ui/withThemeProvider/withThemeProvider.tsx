import React from 'react';
import { useJsonSettings } from '@/entities/User';
import ThemeProvider from '../ThemeProvider/ThemeProvider';

export const withThemeProvider = (Component: React.ComponentType) => {
    return () => {
        const { theme: defaultTheme } = useJsonSettings();
        return (
            <ThemeProvider initialTheme={defaultTheme}>
                <Component />
            </ThemeProvider>
        );
    };
};
