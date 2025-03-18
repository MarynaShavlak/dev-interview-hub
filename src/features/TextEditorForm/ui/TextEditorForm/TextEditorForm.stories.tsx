import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContentState, EditorState } from 'draft-js';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { TextEditorForm } from './TextEditorForm';

export default {
    title: 'features/TextEditorForm',
    component: TextEditorForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        loki: { skip: true },
    },
} as ComponentMeta<typeof TextEditorForm>;

const Template: ComponentStory<typeof TextEditorForm> = (args) => (
    <TextEditorForm {...args} />
);

const baseArgs = {
    title: 'Title of text block',
    handleTitleChange: (value: string) => console.log('Title changed:', value),
    editorState: EditorState.createWithContent(
        ContentState.createFromText(
            'This is some initial text for the editor.',
        ),
    ),
    onEditorStateChange: (state: EditorState) =>
        console.log('Editor state changed', state),
    onSave: () => console.log('Saved!'),
    onDelete: () => console.log('Deleted!'),
    hasNoContent: false,
};

const withTitleArgs = {
    title: 'Title of text block',
    hasNoContent: true,
    editorState: EditorState.createEmpty(),
};

const withTextOnly = {
    editorState: EditorState.createWithContent(
        ContentState.createFromText(
            'This is some initial text for the editor.',
        ),
    ),
    title: '',
    hasNoContent: false,
};

export const Default = Template.bind({});
Default.args = baseArgs;

export const DefaultDark = Template.bind({});
DefaultDark.args = baseArgs;
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = baseArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const DefaultRedesignedDark = Template.bind({});
DefaultRedesignedDark.args = baseArgs;
DefaultRedesignedDark.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.DARK),
];

export const DefaultRedesignedOrange = Template.bind({});
DefaultRedesignedOrange.args = baseArgs;
DefaultRedesignedOrange.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];

export const WithTitleOnly = Template.bind({});
WithTitleOnly.args = {
    ...baseArgs,
    ...withTitleArgs,
};

export const WithTitleOnlyRedesigned = Template.bind({});
WithTitleOnlyRedesigned.args = {
    ...baseArgs,
    ...withTitleArgs,
};
WithTitleOnlyRedesigned.decorators = [NewDesignDecorator];

export const WithTextOnly = Template.bind({});
WithTextOnly.args = {
    ...baseArgs,
    ...withTextOnly,
};

export const WithTextOnlyRedesigned = Template.bind({});
WithTextOnlyRedesigned.args = {
    ...baseArgs,
    ...withTextOnly,
};
WithTextOnlyRedesigned.decorators = [NewDesignDecorator];
