import { Story } from '@storybook/react';
// eslint-disable-next-line ms-production-project-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`} style={{ padding: '20px' }}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
