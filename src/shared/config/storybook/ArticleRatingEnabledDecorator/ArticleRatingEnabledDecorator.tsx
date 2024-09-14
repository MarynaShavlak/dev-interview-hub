import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures/setGetFeatures';

/**
 * The `ArticleRatingEnabledDecorator` is a Storybook decorator that configures the feature flags to enable the article rating feature.
 * It updates the global feature flag settings to ensure the article rating feature is enabled for the Storybook component being rendered.
 *
 * @param StoryComponent - The Storybook component (or story) to be wrapped and rendered with the article rating feature enabled.
 *
 * @returns The `StoryComponent` wrapped in a `div` with updated feature flags, ensuring that the article rating functionality is active during rendering.
 *
 * Usage: Apply this decorator to test components in Storybook with the article rating feature enabled.
 */

export const ArticleRatingEnabledDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isArticleRatingEnabled: true });
    return (
        <div>
            <StoryComponent />
        </div>
    );
};
