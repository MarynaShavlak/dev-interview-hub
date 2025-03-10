import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { TablePagination } from './TablePagination';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/TablePagination',
    component: TablePagination,

    argTypes: {
        className: { control: 'text' },
    },
} as ComponentMeta<typeof TablePagination>;

const Template: ComponentStory<typeof TablePagination> = (args) => {
    const table = useReactTable({
        data: new Array(50)
            .fill(null)
            .map((_, index) => ({ id: index, name: `Item ${index + 1}` })),
        columns: [{ accessorKey: 'name', header: 'Name' }],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return <TablePagination {...args} table={table} />;
};

export const Default = Template.bind({});

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithPrevDisabled = Template.bind({});

WithPrevDisabled.args = {
    table: {
        // @ts-ignore
        getState: () => ({ pagination: { pageIndex: 0, pageSize: 10 } }),
    },
};

export const WithNextDisabled = Template.bind({});
WithNextDisabled.args = {
    table: {
        // @ts-ignore
        getState: () => ({ pagination: { pageIndex: 4, pageSize: 4 } }),
    },
};
