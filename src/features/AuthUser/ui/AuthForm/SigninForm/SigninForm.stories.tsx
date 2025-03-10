import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SigninForm } from './SigninForm';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Auth/SigninForm',
    component: SigninForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof SigninForm>;

const Template: ComponentStory<typeof SigninForm> = (args) => (
    <SigninForm {...args} />
);

const normalArgs = {
    onSuccess: () => console.log('Login successful'),
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];
