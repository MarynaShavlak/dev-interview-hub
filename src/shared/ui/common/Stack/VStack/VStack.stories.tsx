import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VStack } from './VStack';
import { InnerElements } from '../testing';

export default {
    title: 'shared/common/Stack/VStack',
    component: VStack,
    argTypes: {
        backgroundColor: { control: 'color' },
        justify: {
            control: {
                type: 'radio',
                options: [
                    'start',
                    'end',
                    'center',
                    'space-between',
                    'space-around',
                    'space-evenly',
                ],
            },
        },
        align: {
            control: { type: 'radio', options: ['start', 'center', 'end'] },
        },
        gap: {
            control: { type: 'select', options: ['0', '4', '8', '16'] },
        },
        wrap: {
            control: {
                type: 'radio',
                options: ['nowrap', 'wrap', 'wrap-reverse'],
            },
        },
    },
} as ComponentMeta<typeof VStack>;

const Template: ComponentStory<typeof VStack> = (args) => {
    return <VStack {...args} />;
};

export const AlignStart = Template.bind({});
AlignStart.args = {
    align: 'start',
    children: <InnerElements />,
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
    align: 'center',
    children: <InnerElements />,
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
    align: 'end',
    children: <InnerElements />,
};

export const JustifyStart = Template.bind({});
JustifyStart.args = {
    justify: 'start',
    children: <InnerElements />,
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
    justify: 'center',
    children: <InnerElements />,
};

export const JustifyEnd = Template.bind({});
JustifyEnd.args = {
    justify: 'end',
    children: <InnerElements />,
};

export const JustifySpaceBetween = Template.bind({});
JustifySpaceBetween.args = {
    justify: 'between',
    children: <InnerElements />,
};

export const Gap0 = Template.bind({});
Gap0.args = {
    gap: '0',
    children: <InnerElements />,
};

export const Gap4 = Template.bind({});
Gap4.args = {
    gap: '4',
    children: <InnerElements />,
};

export const Gap8 = Template.bind({});
Gap8.args = {
    gap: '8',
    children: <InnerElements />,
};

export const Gap16 = Template.bind({});
Gap16.args = {
    gap: '16',
    children: <InnerElements />,
};
