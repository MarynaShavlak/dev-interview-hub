import { Story } from '@storybook/react';

export const AlignDecorator = (StoryComponent: Story) => (
    <div
        style={{
            transform: 'translate(100px, 0)',
            top: '50%',
            left: '0',
            position: 'absolute',
        }}
    >
        <StoryComponent />
    </div>
);
