import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CodeEditor } from './CodeEditor';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/CodeEditor',
    component: CodeEditor,
    argTypes: {
        initialCode: { control: 'text' },
        height: { control: 'text' },
        width: { control: 'text' },
        loader: { control: 'text' },
        onChangeCode: { action: 'onChangeCode' },
    },
    parameters: {
        loki: { skip: true },
    },
} as ComponentMeta<typeof CodeEditor>;

const Template: ComponentStory<typeof CodeEditor> = (args) => (
    <CodeEditor {...args} />
);

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
    initialCode: 'console.log("Hello, World!");',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};

export const CustomSizeEditor = Template.bind({});
CustomSizeEditor.args = {
    initialCode: 'const x = 10;',
    loader: 'Loading...',
    height: '300px',
    width: '500px',
};

export const PythonEditor = Template.bind({});
PythonEditor.args = {
    initialCode: 'print("Hello Python")',
    initialLanguage: 'python',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};

export const DarkThemeEditor = Template.bind({});
DarkThemeEditor.args = {
    initialCode: 'const a = 5;',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};
DarkThemeEditor.decorators = [ThemeDecorator(Theme.DARK)];

export const RedesignedEditor = Template.bind({});
RedesignedEditor.args = {
    initialCode: 'const a = 10;',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};

RedesignedEditor.decorators = [NewDesignDecorator];

export const RedesignedEditorDark = Template.bind({});
RedesignedEditorDark.args = {
    initialCode: 'const a = 10;',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};

RedesignedEditorDark.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.DARK),
];

export const RedesignedEditorOrange = Template.bind({});
RedesignedEditorOrange.args = {
    initialCode: 'const a = 10;',
    loader: 'Loading...',
    height: '200px',
    width: '100%',
};

RedesignedEditorOrange.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];
