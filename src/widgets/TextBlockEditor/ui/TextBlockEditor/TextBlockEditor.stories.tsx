import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextBlockEditor, TextBlockEditorProps } from './TextBlockEditor';
import { textBlockWithTitleAndFewParagraphs } from '@/entities/Article/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/TextBlockEditor',
    component: TextBlockEditor,
    argTypes: {
        onEditBlock: { action: 'onEditBlock' },
        addBlockInArticle: { action: 'addBlockInArticle' },
        deleteBlockFromArticle: { action: 'deleteBlockFromArticle' },
    },
    parameters: {
        loki: { skip: true },
    },
} as ComponentMeta<typeof TextBlockEditor>;

const Template: ComponentStory<typeof TextBlockEditor> = (args) => (
    <TextBlockEditor {...args} />
);

const baseArgs: TextBlockEditorProps = {
    block: textBlockWithTitleAndFewParagraphs,
    addBlockInArticle: (block) => console.log('Block added:', block),
    deleteBlockFromArticle: (id) => console.log('Block deleted:', id),
    onEditBlock: (block) => console.log('Block edited:', block),
};

export const Default = Template.bind({});
Default.args = {
    ...baseArgs,
};

export const EmptyCodeBlock = Template.bind({});
EmptyCodeBlock.args = {
    ...baseArgs,
    block: { ...textBlockWithTitleAndFewParagraphs, title: '', paragraphs: [] },
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    ...baseArgs,
};
DefaultRedesigned.decorators = [NewDesignDecorator];
export const EmptyTextBlockRedesigned = Template.bind({});
EmptyTextBlockRedesigned.args = {
    ...baseArgs,
    block: { ...textBlockWithTitleAndFewParagraphs, title: '', paragraphs: [] },
};
EmptyTextBlockRedesigned.decorators = [NewDesignDecorator];
