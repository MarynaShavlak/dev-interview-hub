import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from '@/shared/assets/tests/avatar-dropdown.png';

import { AvatarDropdown } from './AvatarDropdown';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import AlignDecorator from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
    <AvatarDropdown {...args} />
);

const baseUserAuthData = {
    id: '1',
    avatar,
    roles: [],
};

const createStory = (roles: UserRole[] = [], isRedesigned = false) => {
    const decorators = [
        StoreDecorator({
            user: {
                authData: {
                    ...baseUserAuthData,
                    roles,
                },
            },
        }),
        AlignDecorator('right'),
    ];

    if (isRedesigned) {
        decorators.push(NewDesignDecorator);
    }

    return decorators;
};

export const User = Template.bind({});
User.args = {};
User.decorators = createStory();

export const Admin = Template.bind({});
Admin.args = {};
Admin.decorators = createStory([UserRole.ADMIN]);

export const Manager = Template.bind({});
Manager.args = {};
Manager.decorators = createStory([UserRole.MANAGER]);

export const UserRedesigned = Template.bind({});
UserRedesigned.args = {};
UserRedesigned.decorators = createStory([], true);

export const AdminRedesigned = Template.bind({});
AdminRedesigned.args = {};
AdminRedesigned.decorators = createStory([UserRole.ADMIN], true);

export const ManagerRedesigned = Template.bind({});
ManagerRedesigned.args = {};
ManagerRedesigned.decorators = createStory([UserRole.MANAGER], true);
