import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures/setGetFeatures';

export const ArticleRatingEnabledDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isArticleRatingEnabled: true });
    return (
        <div>
            <StoryComponent />
        </div>
    );
};
