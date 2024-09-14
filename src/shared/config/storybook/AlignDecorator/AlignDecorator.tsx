import { Story } from '@storybook/react';
import React from 'react';

type Alignment = 'center' | 'right';

/**
 * The `AlignDecorator` is a Storybook decorator that applies alignment styles to components based on the provided alignment value.
 * It allows you to position the Storybook component either at the center or the right of the container, facilitating layout testing.
 *
 * @param alignment - The alignment position for the component. It can be either `center` or `right`.
 *
 * @returns A function that takes a Storybook component (`StoryComponent`) and wraps it in a `div` with the appropriate CSS styles
 *          applied based on the specified alignment.
 *
 * Usage: Apply this decorator to test how components appear when aligned to different positions within their container.
 */

export const AlignDecorator =
    (alignment: Alignment) => (StoryComponent: Story) => {
        const style: React.CSSProperties = {
            position: 'absolute',
            ...(alignment === 'center' && {
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
            }),
            ...(alignment === 'right' && {
                top: '20px',
                right: '20px',
            }),
        };

        return (
            <div style={style}>
                <StoryComponent />
            </div>
        );
    };
