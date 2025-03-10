import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures/setGetFeatures';

/**
 * The `NewDesignDecorator` is a Storybook decorator that activates the new design feature by updating the feature flags.
 * It applies a specific class and inline styles to the `div` wrapping the Storybook component, simulating the redesigned app layout.
 *
 * @param StoryComponent - The Storybook component (or story) to be wrapped and rendered with the new design feature enabled.
 *
 * @returns The `StoryComponent` wrapped in a styled `div` with updated feature flags, allowing for testing of the new design implementation.
 *
 * Usage: Apply this decorator to test components in Storybook with the new design features and layout.
 */

export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
    return (
        <div
            className="app_redesigned"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '20px',
            }}
        >
            <style>
                {`
                    .app_redesigned *::-webkit-scrollbar {
                        width: 12px;
                        height: 8px;
                    }
                    
                    .app_redesigned *::-webkit-scrollbar-track {
                        background: var(--light-bg-redesigned);
                    }

                    .app_redesigned *::-webkit-scrollbar-thumb {
                        background-color: var(--icon-redesigned);
                        border-radius: 20px;
                        border: 2px solid var(--accent-redesigned);
                    }
                `}
            </style>
            <StoryComponent />
        </div>
    );
};
