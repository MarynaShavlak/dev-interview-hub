import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddVocabularyForm from './AddVocabularyForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Question/AddQuestionForm',
    component: AddVocabularyForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddVocabularyForm>;

const Template: ComponentStory<typeof AddVocabularyForm> = (args) => (
    <AddVocabularyForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
