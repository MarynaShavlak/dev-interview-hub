import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List, ListProps } from './List';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/List',
    component: List,
    argTypes: {
        variant: { control: 'radio', options: ['primary', 'accent'] },
        type: { control: 'radio', options: ['ordered', 'unordered'] },
        align: { control: 'radio', options: ['left', 'center', 'right'] },
        bold: { control: 'boolean' },
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args: ListProps) => (
    <List {...args} />
);

export const Default = Template.bind({});
Default.args = {
    items: ['Item 1', 'Item 2', 'Item 3'],
};

export const OrderedList = Template.bind({});
OrderedList.args = {
    items: ['First', 'Second', 'Third'],
    type: 'ordered',
};

export const BoldList = Template.bind({});
BoldList.args = {
    items: ['Bold Item 1', 'Bold Item 2'],
    bold: true,
};

export const AccentCentered = Template.bind({});
AccentCentered.args = {
    items: ['Item 1', 'Item 2'],
    variant: 'accent',
    align: 'center',
};

export const AlignLeft = Template.bind({});
AlignLeft.args = {
    items: ['Left Aligned 1', 'Left Aligned 2'],
    align: 'left',
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
    items: ['Center Aligned 1', 'Center Aligned 2'],
    align: 'center',
};

export const AlignRight = Template.bind({});
AlignRight.args = {
    items: ['Right Aligned 1', 'Right Aligned 2'],
    align: 'right',
};
