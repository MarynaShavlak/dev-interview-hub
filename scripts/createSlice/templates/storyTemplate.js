/**
 * Generates a Storybook configuration file for a given React component.
 *
 * This module exports a string that represents the content of a Storybook configuration file.
 * It sets up the component's story, including default settings and the `argTypes` for Storybook controls.
 *
 * @param {string} layer - The Storybook story layer (category) in which the component will be categorized.
 * @param {string} componentName - The name of the component to be used in the Storybook configuration.
 * @return {string} The content of the Storybook configuration file as a string.
 *
 * @example
 * // returns a string that sets up a Storybook story for the `AuthForm'` component under the `features` layer
 * module.exports('features', 'AuthForm');
 */

module.exports = (layer, componentName) => `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};`;
