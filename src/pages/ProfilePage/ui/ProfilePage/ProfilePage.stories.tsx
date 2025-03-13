import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ProfilePage from './ProfilePage';
import { testUserData } from '@/entities/User/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    decorators: [
        StoreDecorator({
            profile: {
                form: testUserData,
            },
        }),
    ],
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args} />
);

export const Default = Template.bind({});

export const DefaultRedesigned = Template.bind({});

DefaultRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.decorators = [() => <ProfilePageSkeleton />];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [
    () => <ProfilePageSkeleton />,
    NewDesignDecorator,
];
