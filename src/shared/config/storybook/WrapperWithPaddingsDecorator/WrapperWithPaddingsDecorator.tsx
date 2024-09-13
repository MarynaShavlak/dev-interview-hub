import { Story } from '@storybook/react';

export const WrapperWithPaddingsDecorator = (StoryComponent: Story) => {
    return (
        <div
            style={{
                paddingRight: '80px',
            }}
        >
            <StoryComponent />
        </div>
    );
};
