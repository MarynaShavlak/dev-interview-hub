import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Overlay } from './Overlay';

export default {
    title: 'shared/Overlay',
    component: Overlay,
    argTypes: {
        onClick: { action: 'clicked' },
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => (
    <Overlay {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export const Clickable = Template.bind({});
Clickable.args = {
    onClick: () => alert('Overlay clicked!'),
};
