import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DisabledStar } from './DisabedStar';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/StarRating/DisabledStar',
    component: DisabledStar,
    argTypes: {},
} as ComponentMeta<typeof DisabledStar>;

const Template: ComponentStory<typeof DisabledStar> = (args) => (
    <DisabledStar {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    size: 32,
};
export const Large = Template.bind({});
Large.args = {
    size: 64,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    size: 32,
};
NormalRedesigned.decorators = [NewDesignDecorator];

export const LargeRedesigned = Template.bind({});
LargeRedesigned.args = {
    size: 64,
};
LargeRedesigned.decorators = [NewDesignDecorator];
