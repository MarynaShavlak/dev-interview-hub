import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownDirection } from '@/shared/types/ui';

export default {
    title: 'shared/deprecated/Popups/Dropdown',
    component: Dropdown,
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
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        { content: 'First option' },
        { content: 'Second option' },
        { content: 'Third option' },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    trigger: <Button>Open Top Right........</Button>,
    items: [
        { content: 'Top Right 1' },
        { content: 'Top Right 2' },
        { content: 'Top Right 3' },
    ],
    direction: 'top right' as DropdownDirection,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    trigger: <Button>Open Bottom Left........</Button>,
    items: [
        { content: 'Bottom Left 1' },
        { content: 'Bottom Left 2' },
        { content: 'Bottom Left 3' },
    ],
    direction: 'bottom left' as DropdownDirection,
};

export const DisabledTrigger = Template.bind({});
DisabledTrigger.args = {
    trigger: <Button disabled>Disabled Trigger</Button>,
    items: [
        { content: 'Disabled Trigger 1' },
        { content: 'Disabled Trigger 2' },
        { content: 'Disabled Trigger 3' },
    ],
};

export const Empty = Template.bind({});
Empty.args = {
    trigger: <Button>Open Empty</Button>,
    items: [],
};
