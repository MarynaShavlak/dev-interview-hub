import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import { getFeatureFlag } from '../setGetFeatures/setGetFeatures';

/**
 * The `toggleFeatures` function is a utility designed to facilitate feature flag management in a React application. This function enables conditional rendering and behavior adjustments based on feature flag states. It is particularly useful for maintaining a clean codebase while implementing new features or deprecating old ones.
 *
 * @param name - Required. The name of the feature flag to toggle. This should be a key of the `FeatureFlags` type.
 * @param on - Required. A function that returns the value when the feature flag is enabled.
 * @param off - Required. A function that returns the value when the feature flag is disabled.
 *
 * @returns
 * The result of either the `on()` or `off()` function based on the current state of the feature flag specified by `name`.
 *
 */

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({
    off,
    on,
    name,
}: ToggleFeaturesOptions<T>): T {
    if (getFeatureFlag(name)) {
        return on();
    }

    return off();
}
