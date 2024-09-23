import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageError } from './PageError';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => (
    <PageError {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];
