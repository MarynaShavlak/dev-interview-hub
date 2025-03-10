import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RecoverPasswordForm } from './RecoverPasswordForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/AuthUser/RecoverPasswordForm',
    component: RecoverPasswordForm,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof RecoverPasswordForm>;

const Template: ComponentStory<typeof RecoverPasswordForm> = (args) => {
    return <RecoverPasswordForm {...args} />;
};

const normalArgs = {
    toggleForm: () => console.log('Redirect to login form'),
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];
