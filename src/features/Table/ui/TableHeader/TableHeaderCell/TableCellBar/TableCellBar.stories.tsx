import React from 'react';
import { ComponentStory } from '@storybook/react';
import { TableCellBar } from './TableCellBar';
import {
    createMockHeader,
    mockColumnFilters,
    mockHeaderOptionsMapping,
} from '../../../../testing';

export default {
    title: 'features/Table/Header/TableCellBar',
    component: TableCellBar,
    argTypes: {
        isSortAvailable: { control: 'boolean' },
        isFilterAvailable: { control: 'boolean' },
        setColumnFilters: { action: 'setColumnFilters' },
        columnFilters: { control: 'object' },
    },
};

const mockHeader = createMockHeader();

const Template: ComponentStory<typeof TableCellBar> = (args) => (
    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
        <TableCellBar {...args} />
    </div>
);

const defaultArgs = {
    header: mockHeader,
    columnFilters: mockColumnFilters,
    setColumnFilters: () => console.log('Set column filters'),
    headerOptionsMapping: mockHeaderOptionsMapping,
};
export const Default = Template.bind({});
Default.args = {
    ...defaultArgs,
    isSortAvailable: true,
    isFilterAvailable: true,
};

export const SortOnly = Template.bind({});
SortOnly.args = {
    ...defaultArgs,
    isSortAvailable: true,
    isFilterAvailable: false,
};

export const FilterOnly = Template.bind({});
FilterOnly.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: true,
};

export const NoOptions = Template.bind({});
NoOptions.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: false,
};
