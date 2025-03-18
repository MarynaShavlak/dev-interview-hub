import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CodeEditorForm } from './CodeEditorForm';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'features/CodeEditorForm',
    component: CodeEditorForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        loki: { skip: true },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof CodeEditorForm>;

const Template: ComponentStory<typeof CodeEditorForm> = (args) => (
    <CodeEditorForm {...args} />
);

const baseArgs = {
    title: 'Title of code block',
    handleTitleChange: (value: string) => console.log('Title changed:', value),
    code: `
    export interface CodeEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    code: string;
    onCodeChange: (code: string) => void;
    onSave: () => void;
    onDelete: () => void;
    hasNoContent: boolean;
}
`,
    onCodeChange: (value: string) => console.log('Code changed:', value),
    onSave: () => console.log('Save clicked'),
    onDelete: () => console.log('Delete clicked'),
    hasNoContent: false,
};

const withTitleArgs = {
    title: 'Example JavaScript Function',
    hasNoContent: true,
    code: '',
};

const withCodeOnly = {
    code: 'function example() {\n  console.log("Hello, world!");\n}',
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

export const WithCodeOnly = Template.bind({});
WithCodeOnly.args = {
    ...baseArgs,
    ...withCodeOnly,
};

export const WithCodeOnlyRedesigned = Template.bind({});
WithCodeOnlyRedesigned.args = {
    ...baseArgs,
    ...withCodeOnly,
};
WithCodeOnlyRedesigned.decorators = [NewDesignDecorator];
