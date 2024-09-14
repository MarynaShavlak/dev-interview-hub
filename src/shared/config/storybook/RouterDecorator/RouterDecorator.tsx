import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * The `RouterDecorator` function wraps a Storybook component within a `BrowserRouter` from `react-router-dom`,
 * enabling routing support for components in Storybook. This is useful for testing components that rely on
 * `react-router-dom`'s routing features in isolation.
 *
 * @param StoryComponent - The Storybook component (or story) to be wrapped and rendered.
 *
 * @returns The `StoryComponent` wrapped in a `BrowserRouter`, allowing route-based components to function as expected in Storybook.
 */

export const RouterDecorator = (StoryComponent: Story) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
