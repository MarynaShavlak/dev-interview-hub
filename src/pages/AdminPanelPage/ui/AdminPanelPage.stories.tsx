import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AdminPanelPage from './AdminPanelPage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AdminPanelPageSkeleton } from '..';

export default {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = () => (
    <AdminPanelPage />
);

export const Default = Template.bind({});

export const DefaultRedesigned = Template.bind({});

DefaultRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.decorators = [() => <AdminPanelPageSkeleton />];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [
    () => <AdminPanelPageSkeleton />,
    NewDesignDecorator,
];
