import React from 'react';
import { ComponentStory } from '@storybook/react';
import { TableCellBar } from './TableCellBar';
import {
    createMockHeader,
    mockColumnFilters,
    mockHeaderOptionsMapping,
} from '../../../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'features/Table/Header/Cell/TableCellBar',
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
Default.decorators = [AlignDecorator('right')];

export const SortOnly = Template.bind({});
SortOnly.args = {
    ...defaultArgs,
    isSortAvailable: true,
    isFilterAvailable: false,
};
SortOnly.decorators = [AlignDecorator('right')];
export const FilterOnly = Template.bind({});
FilterOnly.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: true,
};
FilterOnly.decorators = [AlignDecorator('right')];
export const NoOptions = Template.bind({});
NoOptions.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: false,
};
NoOptions.decorators = [AlignDecorator('right')];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    ...defaultArgs,
    isSortAvailable: true,
    isFilterAvailable: true,
};
DefaultRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];

export const SortOnlyRedesigned = Template.bind({});
SortOnlyRedesigned.args = {
    ...defaultArgs,
    isSortAvailable: true,
    isFilterAvailable: false,
};
SortOnlyRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];

export const FilterOnlyRedesigned = Template.bind({});
FilterOnlyRedesigned.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: true,
};
FilterOnlyRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];

export const NoOptionsRedesigned = Template.bind({});
NoOptionsRedesigned.args = {
    ...defaultArgs,
    isSortAvailable: false,
    isFilterAvailable: false,
};
NoOptionsRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];
