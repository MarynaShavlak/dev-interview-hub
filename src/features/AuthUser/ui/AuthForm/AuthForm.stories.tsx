import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AuthForm from './AuthForm';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'features/AuthUser/AuthForm',
    component: AuthForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
    <AuthForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
    AlignDecorator('center'),
    StoreDecorator({
        loginForm: { email: 'marynashavlak@gmail.com', password: '12345678' },
    }),
];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
DefaultRedesigned.decorators = [
    StoreDecorator({
        loginForm: { email: 'mary@gmail.com', password: 'asd' },
    }),
    NewDesignDecorator,
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
    StoreDecorator({
        loginForm: { email: 'mary@gmail.com', password: 'asd', error: 'ERROR' },
    }),
];

export const withErrorRedesigned = Template.bind({});
withErrorRedesigned.args = {};
withErrorRedesigned.decorators = [
    StoreDecorator({
        loginForm: { email: 'mary@gmail.com', password: 'asd', error: 'ERROR' },
    }),
    NewDesignDecorator,
];
