import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextBlockComponent } from './TextBlockComponent';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/TextBlockComponent',
    component: TextBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TextBlockComponent>;

const Template: ComponentStory<typeof TextBlockComponent> = (args) => (
    <TextBlockComponent {...args} />
);

// Sample content
const sampleParagraphs = [
    'This is a regular paragraph text.',
    'This text contains <b>bold elements</b> for testing.',
    'This one has <i>italicized text</i> to demonstrate formatting.',
];

const formattedParagraphs = [
    'Paragraph with <b>bold text</b> and <i>italics</i>',
    'Second paragraph with <a href="#">link</a> example',
    'Third paragraph with mixed <b>formatting</b>',
];

// Common args
const baseArgs = {
    paragraphs: sampleParagraphs,
};

const formattedArgs = {
    paragraphs: formattedParagraphs,
    withTags: true,
};

export const Default = Template.bind({});
Default.args = baseArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = baseArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithTitle = Template.bind({});
WithTitle.args = {
    ...baseArgs,
    title: 'Section Title',
};

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = {
    ...baseArgs,
    title: 'Section Title',
};
WithTitleRedesigned.decorators = [NewDesignDecorator];

export const WithTags = Template.bind({});
WithTags.args = formattedArgs;

export const WithTagsRedesigned = Template.bind({});
WithTagsRedesigned.args = formattedArgs;
WithTagsRedesigned.decorators = [NewDesignDecorator];

export const WithTitleAndTags = Template.bind({});
WithTitleAndTags.args = {
    ...formattedArgs,
    title: 'Formatted Content',
};

export const WithTitleAndTagsRedesigned = Template.bind({});
WithTitleAndTagsRedesigned.args = {
    ...formattedArgs,
    title: 'Formatted Content',
};
WithTitleAndTagsRedesigned.decorators = [NewDesignDecorator];
