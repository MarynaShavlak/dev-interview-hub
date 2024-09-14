import { Story } from '@storybook/react';
import React from 'react';

/**
 * The `CustomStylesDecorator` is a Storybook decorator that applies custom inline styles to the wrapped component.
 * This decorator allows you to pass specific CSS properties to adjust the appearance of the component during testing.
 *
 * @param customStyles - An object containing CSS properties to be applied to the component.
 *
 * @returns A function that takes a Storybook component (`StoryComponent`) and wraps it in a `div` with the specified custom styles applied.
 *
 * Usage: Apply this decorator to customize the styling of components in Storybook for visual testing or design adjustments.
 */
export const CustomStylesDecorator = (customStyles: React.CSSProperties) => {
    return (StoryComponent: Story) => {
        return (
            <div style={customStyles}>
                <StoryComponent />
            </div>
        );
    };
};
