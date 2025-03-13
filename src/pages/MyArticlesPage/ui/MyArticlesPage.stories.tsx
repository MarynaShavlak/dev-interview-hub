import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import MyArticlesPage from './MyArticlesPage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { UserRole } from '@/entities/User';
import { MyArticlesPageSkeleton } from '..';

export default {
    title: 'pages/MyArticlesPage',
    component: MyArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    roles: [UserRole.ADMIN],
                    id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
                },
            },
        }),
    ],
} as ComponentMeta<typeof MyArticlesPage>;

const Template: ComponentStory<typeof MyArticlesPage> = () => (
    <MyArticlesPage />
);

export const Normal = Template.bind({});
Normal.args = {};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.decorators = [() => <MyArticlesPageSkeleton />];
export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [
    () => <MyArticlesPageSkeleton />,
    NewDesignDecorator,
];
