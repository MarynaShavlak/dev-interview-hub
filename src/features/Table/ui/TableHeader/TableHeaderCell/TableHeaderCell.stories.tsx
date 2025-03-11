import type { Meta, StoryObj } from '@storybook/react';
import { TableHeaderCell } from './TableHeaderCell';
import { mockColumnFilters, mockHeaderOptionsMapping } from '../../../testing';

// Create meta object for the component
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

export const Default: Story = {
    args: {
        // @ts-ignore
        headerGroup: createMockHeaderGroup(),
        columnFilters: mockColumnFilters,
        headerOptionsMapping: mockHeaderOptionsMapping,
        setColumnFilters: () => console.log('Set column filters'),
        withResizer: true,
    },
};

// Deprecated UI version
// export const DeprecatedUI: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsMapping,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: true,
//     },
//     decorators: [
//         (Story) => {
//             featureFlags.isAppRedesigned = false;
//             return <Story />;
//         },
//     ],
// };
//
// // Redesigned UI version
// export const RedesignedUI: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsMapping,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: true,
//     },
//     decorators: [
//         (Story) => {
//             featureFlags.isAppRedesigned = true;
//             return <Story />;
//         },
//     ],
// };
//
// // With active resizing
// export const WithActiveResizing: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(true),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsMapping,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: true,
//     },
// };
//
// // Without resizer
// export const WithoutResizer: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsMapping,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: false,
//     },
// };
//
// // With color options for filters
// export const WithColorOptions: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsWithColors,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: true,
//     },
// };
//
// // No sorting or filtering available
// export const NoSortNoFilter: Story = {
//     args: {
//         headerGroup: createMockHeaderGroup(false, false, false),
//         columnFilters: mockColumnFilters,
//         headerOptionsMapping: mockHeaderOptionsMapping,
//         setColumnFilters: () => console.log('Set column filters'),
//         withResizer: true,
//     },
// };
