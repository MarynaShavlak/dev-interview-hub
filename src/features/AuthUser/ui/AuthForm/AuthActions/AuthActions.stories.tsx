import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthActions } from './AuthActions';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/AuthUser/AuthActions',
    component: AuthActions,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AuthActions>;

const Template: ComponentStory<typeof AuthActions> = (args) => (
    <AuthActions {...args} />
);

const baseArgs = {
    onSuccess: () => console.log('Authentication successful'),
    onToggleForm: () => console.log('Toggle form clicked'),
};

export const LoginView = Template.bind({});
LoginView.args = {
    ...baseArgs,
    isLoginFormOpen: true,
};

export const LoginViewRedesigned = Template.bind({});
LoginViewRedesigned.args = {
    ...baseArgs,
    isLoginFormOpen: true,
};
LoginViewRedesigned.decorators = [NewDesignDecorator];

export const RegistrationView = Template.bind({});
RegistrationView.args = {
    ...baseArgs,
    isLoginFormOpen: false,
};

export const RegistrationViewRedesigned = Template.bind({});
RegistrationViewRedesigned.args = {
    ...baseArgs,
    isLoginFormOpen: false,
};
RegistrationViewRedesigned.decorators = [NewDesignDecorator];
