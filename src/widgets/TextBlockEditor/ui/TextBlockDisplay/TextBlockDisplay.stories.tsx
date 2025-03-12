import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentState, EditorState } from 'draft-js';
import {
    TextBlockDisplay,
    TextBlockDisplayProps,
} from '../TextBlockDisplay/TextBlockDisplay';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { textBlockWithTitleAndFewParagraphs } from '@/entities/Article/testing';

export default {
    title: 'widgets/TextBlockEditor/TextBlockDisplay',
    component: TextBlockDisplay,
    argTypes: {
        onDelete: { action: 'onDelete' }, // Define action for onDelete
    },
} as ComponentMeta<typeof TextBlockDisplay>;

const Template: ComponentStory<typeof TextBlockDisplay> = (args) => (
    <TextBlockDisplay {...args} />
);

const baseArgs: TextBlockDisplayProps = {
    isEditArticlePage: true,
    isEditing: true,
    formProps: {
        title: 'Title of code block',
        handleTitleChange: (value: string) =>
            console.log('Title changed:', value),
        editorState: EditorState.createWithContent(
            ContentState.createFromText(
                'This is some initial text for the editor.',
            ),
        ),
        onEditorStateChange: (state: EditorState) => console.log('Change text'),
        onSave: () => console.log('Save clicked'),

        hasNoContent: false,
    },
    viewerProps: {
        block: textBlockWithTitleAndFewParagraphs,
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
