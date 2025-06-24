import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CodeBlockComponent } from './CodeBlockComponent';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/CodeBlockComponent',
    component: CodeBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CodeBlockComponent>;

const Template: ComponentStory<typeof CodeBlockComponent> = (args) => (
    <CodeBlockComponent {...args} />
);

// Example code content
const exampleCode = `const greeting = 'Hello, world!';

function sayHello() {
    console.log(greeting);
}

sayHello();`;

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: 'Example Code Block',
    code: exampleCode,
};

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = {
    title: 'Example Code Block',
    code: exampleCode,
};
WithTitleRedesigned.decorators = [NewDesignDecorator];

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    code: exampleCode,
};

export const WithoutTitleRedesigned = Template.bind({});
WithoutTitleRedesigned.args = {
    code: exampleCode,
};
WithoutTitleRedesigned.decorators = [NewDesignDecorator];
