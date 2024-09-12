import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Popover } from './Popover';
import { DropdownDirection } from '@/shared/types/ui';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignCenterDecorator } from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';

export default {
    title: 'shared/redesigned/Popups/Popover',
    component: Popover,
    argTypes: {
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
        backgroundColor: { control: 'color' },
    },
    decorators: [AlignCenterDecorator, NewDesignDecorator],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
    trigger: <Button>Open Popover</Button>,
    children: <div>Popover Content</div>,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    direction: 'top left' as DropdownDirection,
    trigger: <Button>Open Popover (Top Left)</Button>,
    children: <div>Popover Content</div>,
};

export const TopRight = Template.bind({});
TopRight.args = {
    direction: 'top right' as DropdownDirection,
    trigger: <Button>Open Popover (Top Right)</Button>,
    children: <div>Popover Content</div>,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    direction: 'bottom left' as DropdownDirection,
    trigger: <Button>Open Popover (Bottom Left)</Button>,
    children: <div>Popover Content</div>,
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    direction: 'bottom right' as DropdownDirection,
    trigger: <Button>Open Popover (Bottom Right)</Button>,
    children: <div>Popover Content</div>,
};
