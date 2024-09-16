import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AuthByUsername } from './AuthByUsername';

export default {
    title: 'entities/AuthByUsername',
    component: AuthByUsername,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AuthByUsername>;

const Template: ComponentStory<typeof AuthByUsername> = (args) => <AuthByUsername {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};