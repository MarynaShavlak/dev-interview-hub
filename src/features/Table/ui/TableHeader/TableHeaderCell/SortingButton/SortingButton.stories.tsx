import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SortingButton } from './SortingButton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/SortingButton',
    component: SortingButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SortingButton>;

const mockSortDefaultColumn = {
    getIsSorted: () => null, // Change to 'asc' or 'desc' to test sorting states
    getCanSort: () => true,
    getToggleSortingHandler: () => () => alert('Sorting toggled!'),
};

const mockSortAscColumn = {
    ...mockSortDefaultColumn,
    getIsSorted: () => 'asc',
};

const mockSortDescColumn = {
    ...mockSortDefaultColumn,
    getIsSorted: () => 'desc',
};

const Template: ComponentStory<typeof SortingButton> = (args) => (
    <SortingButton {...args} />
);

export const Default = Template.bind({});
// @ts-ignore
Default.args = { column: mockSortDefaultColumn };

export const DefaultRedesigned = Template.bind({});
// @ts-ignore
DefaultRedesigned.args = { column: mockSortDefaultColumn };
DefaultRedesigned.decorators = [NewDesignDecorator];

export const AscSort = Template.bind({});
// @ts-ignore
AscSort.args = { column: mockSortAscColumn };

export const AscSortRedesigned = Template.bind({});
// @ts-ignore
AscSortRedesigned.args = { column: mockSortAscColumn };
AscSortRedesigned.decorators = [NewDesignDecorator];

export const DescSort = Template.bind({});
// @ts-ignore
DescSort.args = { column: mockSortDescColumn };

export const DescSortRedesigned = Template.bind({});
// @ts-ignore
DescSortRedesigned.args = { column: mockSortDescColumn };
DescSortRedesigned.decorators = [NewDesignDecorator];
