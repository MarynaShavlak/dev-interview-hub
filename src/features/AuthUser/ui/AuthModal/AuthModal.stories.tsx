import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthModal } from './AuthModal';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { PortalDecorator } from '@/shared/config/storybook/PortalDecorator/PortalDecorator';

export default {
    title: 'features/AuthUser/AuthModal',
    component: AuthModal,
    argTypes: {
        isOpen: { control: 'boolean' },
        backgroundColor: { control: 'color' },
    },
    args: { isOpen: true },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AuthModal>;

const Template: ComponentStory<typeof AuthModal> = (args) => {
    return <AuthModal {...args} />;
};

const TemplateRedesigned: ComponentStory<typeof AuthModal> = (args) => {
    return <AuthModal {...args} />;
};
export const Default = Template.bind({});

export const DefaultRedesigned = TemplateRedesigned.bind({});
DefaultRedesigned.decorators = [PortalDecorator, NewDesignDecorator];
