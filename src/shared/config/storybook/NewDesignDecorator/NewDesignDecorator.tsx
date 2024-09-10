import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures/setGetFeatures';

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
            <StoryComponent />
        </div>
    );
};
