import { Story } from '@storybook/react';

export const AlignCenterDecorator = (StoryComponent: Story) => (
    <div
        style={{
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            position: 'absolute',
        }}
    >
        <StoryComponent />
    </div>
);

export const AlignRightDecorator = (StoryComponent: Story) => (
    <div
        style={{
            top: '20px',
            right: '20px',
            position: 'absolute',
        }}
    >
        <StoryComponent />
    </div>
);
