import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NoArticlesFound } from './NoArticlesFound';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/NoArticlesFound',
    component: NoArticlesFound,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NoArticlesFound>;

const Template: ComponentStory<typeof NoArticlesFound> = (args) => (
    <NoArticlesFound {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];
