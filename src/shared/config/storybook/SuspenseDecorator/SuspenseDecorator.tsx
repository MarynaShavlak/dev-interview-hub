import { Story } from '@storybook/react';
import { Suspense } from 'react';

/**
 * The `SuspenseDecorator` is a Storybook decorator that wraps components inside React's `Suspense` component.
 * This allows components that rely on code splitting or lazy loading to be rendered in Storybook while
 * showing fallback content (if provided) during asynchronous operations.
 *
 * @param StoryComponent - The Storybook component (or story) to be wrapped with the `Suspense` component.
 *
 * @returns The `StoryComponent` wrapped in a `Suspense` component, enabling the testing of components that
 *          use `React.lazy` or other asynchronous loading mechanisms.
 *
 */

export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
