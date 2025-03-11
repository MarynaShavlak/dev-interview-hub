import type { Meta, StoryObj } from '@storybook/react';
import { TableHeaderCell } from './TableHeaderCell';
import {
    createMockHeaderGroup,
    mockColumnFilters,
    mockHeaderOptionsMapping,
    mockHeaderOptionsWithColors,
} from '../../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
    title: 'features/Table/Header/Cell/TableHeaderCell',
    component: TableHeaderCell,
    argTypes: {
        withResizer: {
            control: 'boolean',
            description: 'Whether to show column resizer handles',
        },
    },
} satisfies Meta<typeof TableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
    headerGroup: createMockHeaderGroup(),
    columnFilters: mockColumnFilters,
    headerOptionsMapping: mockHeaderOptionsMapping,
    setColumnFilters: () => console.log('Set column filters'),
    withResizer: true,
};

const withColorArgs = {
    ...defaultArgs,
    headerOptionsMapping: mockHeaderOptionsWithColors,
};

const noActionsArgs = {
    ...defaultArgs,
    headerGroup: createMockHeaderGroup(false, false, false),
    headerOptionsMapping: mockHeaderOptionsMapping,
};

// @ts-ignore
export const Default: Story = { args: defaultArgs };
// @ts-ignore
export const DefaultRedesigned: Story = { args: defaultArgs };
DefaultRedesigned.decorators = [NewDesignDecorator];

// @ts-ignore
export const WithColorOptions: Story = { args: withColorArgs };

// @ts-ignore
export const WithColorOptionsRedesigned: Story = { args: withColorArgs };
WithColorOptionsRedesigned.decorators = [NewDesignDecorator];
// @ts-ignore
export const NoSortNoFilter: Story = { args: noActionsArgs };
// @ts-ignore
export const NoSortNoFilterRedesigned: Story = { args: noActionsArgs };
NoSortNoFilterRedesigned.decorators = [NewDesignDecorator];
