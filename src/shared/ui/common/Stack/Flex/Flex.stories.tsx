import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';
import { InnerElements, InnerElementsLongList } from '../testing';

export default {
    title: 'shared/common/Stack/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
        direction: {
            control: { type: 'radio', options: ['row', 'column'] },
        },
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
            control: {
                type: 'radio',
                options: ['start', 'end', 'center', 'baseline', 'stretch'],
            },
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
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => {
    return <Flex {...args} />;
};

export const Row = Template.bind({});
Row.args = {
    direction: 'row',
    children: <InnerElements />,
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
    direction: 'row',
    gap: '4',
    children: <InnerElements />,
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
    direction: 'row',
    gap: '8',
    children: <InnerElements />,
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
    direction: 'row',
    gap: '16',
    children: <InnerElements />,
};

export const Column = Template.bind({});
Column.args = {
    direction: 'column',
    children: <InnerElements />,
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
    direction: 'column',
    gap: '16',
    children: <InnerElements />,
};

export const RowWrap = Template.bind({});
RowWrap.args = {
    direction: 'row',
    wrap: 'wrap',
    gap: '8',
    children: <InnerElementsLongList />,
};

export const FullHeight = Template.bind({});
FullHeight.args = {
    direction: 'column',
    fullHeight: true,
    children: <InnerElements />,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
    direction: 'row',
    max: true,
    children: <InnerElements />,
};

export const JustifyStart = Template.bind({});
JustifyStart.args = {
    direction: 'row',
    justify: 'start',
    children: <InnerElements />,
};

export const JustifyEnd = Template.bind({});
JustifyEnd.args = {
    direction: 'row',
    justify: 'end',
    children: <InnerElements />,
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
    direction: 'row',
    justify: 'center',
    children: <InnerElements />,
};

export const JustifySpaceBetween = Template.bind({});
JustifySpaceBetween.args = {
    direction: 'row',
    justify: 'between',
    children: <InnerElements />,
};

export const JustifySpaceAround = Template.bind({});
JustifySpaceAround.args = {
    direction: 'row',
    children: <InnerElements />,
};

export const ColumnJustifyStart = Template.bind({});
ColumnJustifyStart.args = {
    direction: 'column',
    justify: 'start',
    children: <InnerElements />,
};

export const ColumnJustifyEnd = Template.bind({});
ColumnJustifyEnd.args = {
    direction: 'column',
    justify: 'end',
    children: <InnerElements />,
};

export const ColumnJustifyCenter = Template.bind({});
ColumnJustifyCenter.args = {
    direction: 'column',
    justify: 'center',
    children: <InnerElements />,
};

export const ColumnJustifySpaceBetween = Template.bind({});
ColumnJustifySpaceBetween.args = {
    direction: 'column',
    justify: 'between',
    children: <InnerElements />,
};

export const AlignStart = Template.bind({});
AlignStart.args = {
    direction: 'row',
    align: 'start',
    children: <InnerElements />,
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
    direction: 'row',
    align: 'center',
    children: <InnerElements />,
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
    direction: 'row',
    align: 'end',
    children: <InnerElements />,
};

export const ColumnAlignStart = Template.bind({});
ColumnAlignStart.args = {
    direction: 'column',
    align: 'start',
    children: <InnerElements />,
};

export const ColumnAlignCenter = Template.bind({});
ColumnAlignCenter.args = {
    direction: 'column',
    align: 'center',
    children: <InnerElements />,
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
    direction: 'column',
    align: 'end',
    children: <InnerElements />,
};

export const RowJustifyAlignStart = Template.bind({});
RowJustifyAlignStart.args = {
    direction: 'row',
    justify: 'start',
    align: 'start',
    children: <InnerElements />,
};

export const RowJustifyAlignCenter = Template.bind({});
RowJustifyAlignCenter.args = {
    direction: 'row',
    justify: 'center',
    align: 'center',
    children: <InnerElements />,
};

export const RowJustifyAlignEnd = Template.bind({});
RowJustifyAlignEnd.args = {
    direction: 'row',
    justify: 'end',
    align: 'end',
    children: <InnerElements />,
};

export const ColumnJustifyAlignStart = Template.bind({});
ColumnJustifyAlignStart.args = {
    direction: 'column',
    justify: 'start',
    align: 'start',
    children: <InnerElements />,
};

export const ColumnJustifyAlignCenter = Template.bind({});
ColumnJustifyAlignCenter.args = {
    direction: 'column',
    justify: 'center',
    align: 'center',
    children: <InnerElements />,
};

export const ColumnJustifyAlignEnd = Template.bind({});
ColumnJustifyAlignEnd.args = {
    direction: 'column',
    justify: 'end',
    align: 'end',
    children: <InnerElements />,
};
