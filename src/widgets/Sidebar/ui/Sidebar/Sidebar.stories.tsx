import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Sidebar } from './Sidebar';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
    <Sidebar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({ user: { authData: {} } })];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [StoreDecorator({ user: {} })];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
DefaultRedesigned.decorators = [
    (Story) => (
        <div style={{ height: '100vh' }}>
            <Story />
        </div>
    ),
    StoreDecorator({ user: { authData: {} } }),
    NewDesignDecorator,
];

export const NoAuthRedesigned = Template.bind({});
NoAuthRedesigned.args = {};
NoAuthRedesigned.decorators = [
    (Story) => (
        <div style={{ height: '100vh' }}>
            <Story />
        </div>
    ),
    StoreDecorator({ user: {} }),
    NewDesignDecorator,
];
