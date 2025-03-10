import React from 'react';
import { Story } from '@storybook/react';
// eslint-disable-next-line ms-production-project-plugin/layer-imports
import '@/app/styles/index.scss';

// /**
//  * The `StyleDecorator` is a Storybook decorator that applies global styles to all components by importing the main SCSS file.
//  * This ensures that the styles used in the actual application are also applied to the components rendered in Storybook.
//  *
//  * @param story - A function that returns a Storybook component (`Story`).
//  *
//  * @returns The `story` function that renders the component, with global styles applied.
//  *
//  * Usage: Apply this decorator to ensure that all Storybook components inherit the global styles from the project,
//  *        allowing consistent appearance between Storybook and the live app.
//  */
// export const StyleDecorator = (story: () => Story) => story();

export const StyleDecorator = (StoryComponent: Story) => {
    return <StoryComponent />;
};
