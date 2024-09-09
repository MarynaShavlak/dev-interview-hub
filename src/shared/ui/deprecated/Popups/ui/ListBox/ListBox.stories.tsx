import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';
import { DropdownDirection } from '@/shared/types/ui';

export default {
    title: 'shared/deprecated/Popups/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
        direction: {
            control: {
                type: 'select',
                options: [
                    'bottom right',
                    'bottom left',
                    'top right',
                    'top left',
                ],
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    transform: 'translate(100px, 0)',
                    top: '50%',
                    left: '0',
                    position: 'absolute',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    value: '123',
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    direction: 'top left' as DropdownDirection,
    value: '123',
    items: [
        { content: 'Option A', value: '123' },
        { content: 'Option B', value: '456' },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    direction: 'top right' as DropdownDirection,
    value: '123',
    items: [
        { content: 'Option X', value: '123' },
        { content: 'Option Y', value: '456' },
    ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    direction: 'bottom left' as DropdownDirection,
    value: '123',
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    direction: 'bottom right' as DropdownDirection,
    value: '123',
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
};

export const NoSelectedValue = Template.bind({});
NoSelectedValue.args = {
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
    defaultValue: '123',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    readonly: true,
    value: '123',
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    label: 'Select an option',
    value: '123',
    items: [
        { content: 'Option 1', value: '123' },
        { content: 'Option 2', value: '456' },
    ],
};
