import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TableFilter } from './TableFilter';
import { CommonFilterType } from '../../../../model/types/tableTypes';
import { colorOptions, stringOptions } from '../../../../testing';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/Header/TableFilter/TableFilter',
    component: TableFilter,
    argTypes: {},
} as ComponentMeta<typeof TableFilter>;

const Template: ComponentStory<typeof TableFilter> = (args) => {
    const [filters, setFilters] = useState<CommonFilterType>([]);

    return (
        <TableFilter
            {...args}
            columnFilters={filters}
            setColumnFilters={setFilters}
        />
    );
};
const stringArgs = {
    filterCategory: 'stringFilter',
    allOptions: stringOptions,
};
const colorArgs = {
    filterCategory: 'colorFilter',
    allOptions: colorOptions,
};
const emptyArgs = {
    filterCategory: 'emptyFilter',
    allOptions: [],
};

export const StringFilter = Template.bind({});
StringFilter.args = stringArgs;
StringFilter.decorators = [AlignDecorator('right')];

export const ColorFilter = Template.bind({});
ColorFilter.args = colorArgs;
ColorFilter.decorators = [AlignDecorator('right')];

export const NoFilters = Template.bind({});
NoFilters.args = emptyArgs;
NoFilters.decorators = [AlignDecorator('right')];

export const StringFilterRedesigned = Template.bind({});
StringFilterRedesigned.args = stringArgs;
StringFilterRedesigned.decorators = [
    AlignDecorator('right'),
    NewDesignDecorator,
];

export const ColorFilterRedesigned = Template.bind({});
ColorFilterRedesigned.args = colorArgs;
ColorFilterRedesigned.decorators = [
    AlignDecorator('right'),
    NewDesignDecorator,
];

export const NoFiltersRedesigned = Template.bind({});
NoFiltersRedesigned.args = emptyArgs;
NoFiltersRedesigned.decorators = [AlignDecorator('right'), NewDesignDecorator];
