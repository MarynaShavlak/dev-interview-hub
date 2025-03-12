import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    CodeBlockDisplay,
    CodeBlockDisplayProps,
} from '../CodeBlockDisplay/CodeBlockDisplay';
import { codeBlockWithTitle } from '@/entities/Article/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/CodeBlockEditor/CodeBlockDisplay',
    component: CodeBlockDisplay,
    argTypes: {
        onDelete: { action: 'onDelete' }, // Define action for onDelete
    },
} as ComponentMeta<typeof CodeBlockDisplay>;

const Template: ComponentStory<typeof CodeBlockDisplay> = (args) => (
    <CodeBlockDisplay {...args} />
);

const baseArgs: CodeBlockDisplayProps = {
    isEditArticlePage: true,
    isEditing: true,
    formProps: {
        title: 'Title of code block',
        handleTitleChange: (value: string) =>
            console.log('Title changed:', value),
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

        hasNoContent: false,
    },
    viewerProps: {
        block: codeBlockWithTitle,
        editBlock: () => console.log('Edit block clicked'),
    },
    onDelete: () => console.log('Delete block clicked'),
    isEmptyInfo: false,
};

export const Default = Template.bind({});
Default.args = {
    ...baseArgs,
};

export const NonEditMode = Template.bind({});
NonEditMode.args = {
    ...baseArgs,
    isEditing: false,
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    ...baseArgs,
};
DefaultRedesigned.decorators = [NewDesignDecorator];
export const NonEditModeRedesigned = Template.bind({});
NonEditModeRedesigned.args = {
    ...baseArgs,
    isEditing: false,
};
NonEditModeRedesigned.decorators = [NewDesignDecorator];
