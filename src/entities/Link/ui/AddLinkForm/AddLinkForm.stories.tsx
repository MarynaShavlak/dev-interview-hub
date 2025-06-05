import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddLinkForm from './AddLinkForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Question/AddQuestionForm',
    component: AddLinkForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddLinkForm>;

const Template: ComponentStory<typeof AddLinkForm> = (args) => (
    <AddLinkForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
