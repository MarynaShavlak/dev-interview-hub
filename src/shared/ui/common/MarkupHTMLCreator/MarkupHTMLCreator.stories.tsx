import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentState, EditorState, RichUtils } from 'draft-js';
import { MarkupHTMLCreator } from './MarkupHTMLCreator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/MarkupHTMLCreator',
    component: MarkupHTMLCreator,
    argTypes: {
        editorState: { control: 'object' },
        onEditorStateChange: { action: 'onEditorStateChange' },
    },
} as ComponentMeta<typeof MarkupHTMLCreator>;

const Template: ComponentStory<typeof MarkupHTMLCreator> = (args) => (
    <MarkupHTMLCreator {...args} />
);

const defaultEditorState = EditorState.createEmpty();
const editorWithText = EditorState.createWithContent(
    ContentState.createFromText('This is some initial text for the editor.'),
);

const createBoldEditorState = () => {
    const contentState = ContentState.createFromText('This is a bold text.');
    const editorState = EditorState.createWithContent(contentState);
    const selectionState = editorState.getSelection().merge({
        anchorOffset: 0,
        focusOffset: contentState.getFirstBlock().getLength(),
    });

    const contentStateWithStyle = RichUtils.toggleInlineStyle(
        EditorState.forceSelection(editorState, selectionState),
        'BOLD',
    );

    return contentStateWithStyle;
};

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
    editorState: defaultEditorState,
};

export const DarkEditor = Template.bind({});
DarkEditor.args = {
    editorState: defaultEditorState,
};
DarkEditor.decorators = [ThemeDecorator(Theme.DARK)];

export const EditorWithText = Template.bind({});
EditorWithText.args = {
    editorState: editorWithText,
};

export const EditorWithFormatting = Template.bind({});
EditorWithFormatting.args = {
    editorState: createBoldEditorState(),
};

export const RedesignedEditor = Template.bind({});
RedesignedEditor.args = {
    editorState: EditorState.createEmpty(),
};
RedesignedEditor.decorators = [NewDesignDecorator];
