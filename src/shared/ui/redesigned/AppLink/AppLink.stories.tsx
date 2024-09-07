import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppLink } from './AppLink';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'red', 'secondary', 'green'],
        },
    },
    args: {
        to: '/',
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
    <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary Link',
    variant: 'primary',
};

export const Red = Template.bind({});
Red.args = {
    children: 'Red Link',
    variant: 'red',
};

export const WithActiveClass = Template.bind({});
WithActiveClass.args = {
    children: 'Active Link',
    variant: 'primary',
    activeClassName: 'active-link',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
    children: 'External Link',
    to: 'https://example.com',
    variant: 'primary',
    target: '_blank',
    rel: 'noopener noreferrer',
};
