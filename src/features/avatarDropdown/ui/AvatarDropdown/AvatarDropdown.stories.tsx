import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { AvatarDropdown } from './AvatarDropdown';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                avatar: 'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716422400&semt=ais_user',
                roles: [],
            },
        },
    }),
];

export const Admin = Template.bind({});
Admin.args = {};
Admin.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                avatar: 'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716422400&semt=ais_user',
                roles: [UserRole.ADMIN],
            },
        },
    }),
];

export const Manager = Template.bind({});
Manager.args = {};
Manager.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                avatar: 'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716422400&semt=ais_user',
                roles: [UserRole.MANAGER],
            },
        },
    }),
];
