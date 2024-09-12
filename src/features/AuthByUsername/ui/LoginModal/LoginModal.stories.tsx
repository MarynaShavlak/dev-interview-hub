import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginModal } from './LoginModal';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// Set up the metadata for the component in Storybook
export default {
    title: 'features/AuthByUsername/LoginModal',
    component: LoginModal,
    argTypes: {
        isOpen: { control: 'boolean' },
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof LoginModal>;

// Template for creating various stories
const Template: ComponentStory<typeof LoginModal> = (args) => (
    <LoginModal {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    isOpen: true,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    isOpen: true,
};
NormalRedesigned.decorators = [NewDesignDecorator];
