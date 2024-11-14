import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthModal } from './AuthModal';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// Set up the metadata for the component in Storybook
export default {
    title: 'features/AuthByUsername/AuthModal',
    component: AuthModal,
    argTypes: {
        isOpen: { control: 'boolean' },
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AuthModal>;

// Template for creating various stories
const Template: ComponentStory<typeof AuthModal> = (args) => (
    <AuthModal {...args} />
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
