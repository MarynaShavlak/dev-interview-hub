import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddQuestionForm from './AddQuestionForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Question/AddQuestionForm',
    component: AddQuestionForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddQuestionForm>;

const Template: ComponentStory<typeof AddQuestionForm> = (args) => (
    <AddQuestionForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
