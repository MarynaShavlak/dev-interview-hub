import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from './Box'; // Update the path if needed

export default {
    title: 'shared/common/Box',
    component: Box,
    argTypes: {
        backgroundColor: { control: 'color' },
        width: { control: 'text' },
        height: { control: 'text' },
        onMouseDown: { action: 'mouseDown' },
        onTouchStart: { action: 'touchStart' },
    },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {
    width: '200px',
    height: '200px',
    backgroundColor: 'lightgray',
    children: 'Default Box',
};

export const CustomDimensions = Template.bind({});
CustomDimensions.args = {
    width: '300px',
    height: '150px',
    backgroundColor: 'lightblue',
    children: 'Box with Custom Dimensions',
};

export const BoxWithMouseDown = Template.bind({});
BoxWithMouseDown.args = {
    width: '250px',
    height: '250px',
    backgroundColor: 'lightgreen',
    children: 'Click Me!',
    onMouseDown: (event) => {
        console.log('Mouse Down Event Triggered', event);
    },
};

export const BoxWithNoBackground = Template.bind({});
BoxWithNoBackground.args = {
    width: '200px',
    height: '200px',
    backgroundColor: 'transparent',
    children: 'Box with No Background',
};
