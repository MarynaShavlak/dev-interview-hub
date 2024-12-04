import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownDirection } from '@/shared/types/ui';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'shared/redesigned/Popups/Dropdown',
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
    decorators: [AlignDecorator('center'), NewDesignDecorator],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        { label: 'First option' },
        { label: 'Second option' },
        { label: 'Third option' },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    trigger: <Button>Open Top Right........</Button>,
    items: [
        { label: 'Top Right 1' },
        { label: 'Top Right 2' },
        { label: 'Top Right 3' },
    ],
    direction: 'top right' as DropdownDirection,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    trigger: <Button>Open Bottom Left........</Button>,
    items: [
        { label: 'Bottom Left 1' },
        { label: 'Bottom Left 2' },
        { label: 'Bottom Left 3' },
    ],
    direction: 'bottom left' as DropdownDirection,
};

export const DisabledTrigger = Template.bind({});
DisabledTrigger.args = {
    trigger: <Button disabled>Disabled Trigger</Button>,
    items: [
        { label: 'Disabled Trigger 1' },
        { label: 'Disabled Trigger 2' },
        { label: 'Disabled Trigger 3' },
    ],
};

export const Empty = Template.bind({});
Empty.args = {
    trigger: <Button>Open Empty</Button>,
    items: [],
};
