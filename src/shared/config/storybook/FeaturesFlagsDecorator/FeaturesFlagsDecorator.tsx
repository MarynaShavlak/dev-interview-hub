import { Story } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';

/**
 * The `FeaturesFlagsDecorator` is a Storybook decorator that allows you to set feature flags for a Storybook component.
 * This decorator enables testing of different feature states, by updating the global feature flag configuration before rendering the story.
 *
 * @param features - An object representing the feature flags to be set, where each flag controls a feature's activation state.
 *
 * @returns A function that takes a Storybook component (`StoryComponent`) and applies the feature flags using `setFeatureFlags`,
 *          allowing the component to be rendered under the configured feature flag settings.
 *
 * Usage: Apply this decorator to test how components behave under various feature flag configurations in Storybook.
 */

export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
