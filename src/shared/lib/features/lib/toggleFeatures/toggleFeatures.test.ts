import { toggleFeatures } from './toggleFeatures';
import { setFeatureFlags } from '../..';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';

describe('toggleFeatures', () => {
    // Set up and tear down feature flags for each test
    beforeEach(() => {
        // Reset featureFlags to default state before each test
        setFeatureFlags({
            isAppRedesigned: false,
            isArticleRatingEnabled: false,
        });
    });

    test('should return result of on() when feature flag is enabled', () => {
        setFeatureFlags({
            isAppRedesigned: true, // Set feature flag to true
        });

        const result = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => 'Redesigned Feature',
            off: () => 'Deprecated Feature',
        });
        expect(result).toBe('Redesigned Feature');
    });

    test('should return result of off() when feature flag is disabled', () => {
        setFeatureFlags({
            isArticleRatingEnabled: false, // Set feature flag to false
        });

        const result = toggleFeatures({
            name: 'isArticleRatingEnabled',
            on: () => 'isArticleRatingEnabled Enabled',
            off: () => 'isArticleRatingEnabled Disabled',
        });
        expect(result).toBe('isArticleRatingEnabled Disabled');
    });

    test('should return correct result when feature flag is undefined', () => {
        setFeatureFlags({});

        const result = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => 'Redesigned Feature',
            off: () => 'Deprecated Feature',
        });
        expect(result).toBe('Deprecated Feature');
    });

    test('should handle edge case when on() and off() return the same value', () => {
        setFeatureFlags({
            isArticleRatingEnabled: false, // Set feature flag to false
        });

        const result = toggleFeatures({
            name: 'isArticleRatingEnabled',
            on: () => 'Same Result',
            off: () => 'Same Result',
        });
        expect(result).toBe('Same Result');
    });

    test('should handle feature flag with undefined value', () => {
        setFeatureFlags({
            isAppRedesigned: undefined, // Explicitly set feature flag to undefined
        });

        const result = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => 'Redesigned Feature',
            off: () => 'Deprecated Feature',
        });
        expect(result).toBe('Deprecated Feature');
    });

    test('should handle setting feature flags to null', () => {
        setFeatureFlags(null as unknown as FeatureFlags); // Force null value

        const result = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => 'Redesigned Feature',
            off: () => 'Deprecated Feature',
        });
        expect(result).toBe('Deprecated Feature');
    });
});
