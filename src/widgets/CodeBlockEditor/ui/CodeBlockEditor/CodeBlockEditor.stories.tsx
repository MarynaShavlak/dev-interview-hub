import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CodeBlockEditor, CodeBlockEditorProps } from './CodeBlockEditor';
import { codeBlockWithTitle } from '@/entities/Article/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/CodeBlockEditor',
    component: CodeBlockEditor,
    argTypes: {
        onEditBlock: { action: 'onEditBlock' },
        addBlockInArticle: { action: 'addBlockInArticle' },
        deleteBlockFromArticle: { action: 'deleteBlockFromArticle' },
    },
} as ComponentMeta<typeof CodeBlockEditor>;

const Template: ComponentStory<typeof CodeBlockEditor> = (args) => (
    <CodeBlockEditor {...args} />
);

const baseArgs: CodeBlockEditorProps = {
    block: codeBlockWithTitle,
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
    block: { ...codeBlockWithTitle, title: '', code: '' },
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    ...baseArgs,
};
DefaultRedesigned.decorators = [NewDesignDecorator];
export const EmptyCodeBlockRedesigned = Template.bind({});
EmptyCodeBlockRedesigned.args = {
    ...baseArgs,
    block: { ...codeBlockWithTitle, title: '', code: '' },
};
EmptyCodeBlockRedesigned.decorators = [NewDesignDecorator];
