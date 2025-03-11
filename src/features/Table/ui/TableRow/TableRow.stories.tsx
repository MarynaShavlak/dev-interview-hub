import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from './TableRow';
import { createMockRow, mockPersons } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
    title: 'features/Table/TableRow',
    component: TableRow,
    parameters: {
        layout: 'centered',
    },

    decorators: [
        (Story) => (
            <div style={{ width: '100%', maxWidth: '800px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = { row: createMockRow(mockPersons[0]) };
// @ts-ignore
export const Default: Story = { args: defaultArgs };

export const DefaultRedesigned: Story = { args: defaultArgs };
DefaultRedesigned.decorators = [NewDesignDecorator];
// // Story with redesigned styling
// export const Redesigned: Story = {
//     args: {
//         row: createMockRow(mockPersons[0]),
//     },
//     decorators: [
//         (Story) => {
//             featureFlags.isAppRedesigned = true;
//             return <Story />;
//         },
//     ],
// };
//
// // Story with a different set of data
// export const AlternativeData: Story = {
//     args: {
//         row: createMockRow(mockPersons[1]),
//     },
// };
//
// // Story with custom cell content
// export const WithCustomCellContent: Story = {
//     args: {
//         row: createMockRow({
//             firstName: 'Custom',
//             lastName: 'Content',
//             age: 42,
//             status: 'active'
//         }),
//     },
//     decorators: [
//         (Story) => {
//             // Override the columns for this story
//             const customColumns = [
//                 columnHelper.accessor('firstName', {
//                     cell: () => <strong style={{ color: 'blue' }}>Custom Name</strong>,
//                     header: () => 'First Name',
//                     size: 120,
//                 }),
//                 columnHelper.accessor('lastName', {
//                     cell: () => <em>With Emphasis</em>,
//                     header: () => 'Last Name',
//                     size: 120,
//                 }),
//                 columnHelper.accessor('age', {
//                     cell: info => <div className="badge">{info.getValue()}</div>,
//                     header: () => 'Age',
//                     size: 80,
//                 }),
//                 columnHelper.accessor('status', {
//                     cell: info =>
//                         <div className="status-indicator">
//                             <span className={`dot ${info.getValue() === 'active' ? 'active' : 'inactive'}`}></span>
//                             {info.getValue()}
//                         </div>,
//                     header: () => 'Status',
//                     size: 100,
//                 }),
//             ];
//
//             // Override the getVisibleCells method
//             const customRow = createMockRow({
//                 firstName: 'Custom',
//                 lastName: 'Content',
//                 age: 42,
//                 status: 'active'
//             });
//
//             customRow.getVisibleCells = () => customColumns.map((column, index) => ({
//                 id: `custom-${index}`,
//                 column: {
//                     id: `col-${index}`,
//                     getSize: () => column.size || 100,
//                     columnDef: column
//                 },
//                 getContext: () => ({
//                     table: {},
//                     column: column,
//                     row: { original: { firstName: 'Custom', lastName: 'Content', age: 42, status: 'active' } },
//                     getValue: () => {
//                         const key = column.accessorKey as keyof Person;
//                         return { firstName: 'Custom', lastName: 'Content', age: 42, status: 'active' }[key];
//                     },
//                     renderValue: () => null,
//                 })
//             }));
//
//             return (
//                 <>
//                     <style>
//                         {`
//               .badge {
//                 background-color: #eee;
//                 padding: 2px 8px;
//                 border-radius: 12px;
//                 font-weight: bold;
//               }
//               .status-indicator {
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//               }
//               .dot {
//                 height: 10px;
//                 width: 10px;
//                 border-radius: 50%;
//                 display: inline-block;
//               }
//               .dot.active {
//                 background-color: green;
//               }
//               .dot.inactive {
//                 background-color: red;
//               }
//             `}
//                     </style>
//                     <Story />
//                 </>
//             );
//         },
//     ],
// };
//
// // Story with many columns
// export const ManyColumns: Story = {
//     decorators: [
//         (Story) => {
//             const manyColumnsData = {
//                 firstName: 'Many',
//                 lastName: 'Columns',
//                 age: 35,
//                 status: 'active',
//                 // Additional properties
//                 email: 'many.columns@example.com',
//                 phone: '123-456-7890',
//                 address: '123 Main St',
//                 city: 'Anytown',
//                 state: 'CA',
//                 zipCode: '12345',
//                 country: 'USA',
//                 company: 'Example Corp',
//                 department: 'Engineering'
//             };
//
//             // Create more columns
//             const manyColumns = [
//                 columnHelper.accessor('firstName', {
//                     cell: info => info.getValue(),
//                     header: () => 'First Name',
//                     size: 80,
//                 }),
//                 columnHelper.accessor('lastName', {
//                     cell: info => info.getValue(),
//                     header: () => 'Last Name',
//                     size: 80,
//                 }),
//                 columnHelper.accessor('age', {
//                     cell: info => info.getValue(),
//                     header: () => 'Age',
//                     size: 40,
//                 }),
//                 columnHelper.accessor('status', {
//                     cell: info => info.getValue(),
//                     header: () => 'Status',
//                     size: 60,
//                 }),
//                 // Additional columns
//                 columnHelper.accessor('email' as any, {
//                     cell: info => info.getValue(),
//                     header: () => 'Email',
//                     size: 150,
//                 }),
//                 columnHelper.accessor('phone' as any, {
//                     cell: info => info.getValue(),
//                     header: () => 'Phone',
//                     size: 100,
//                 }),
//                 columnHelper.accessor('address' as any, {
//                     cell: info => info.getValue(),
//                     header: () => 'Address',
//                     size: 120,
//                 }),
//                 columnHelper.accessor('city' as any, {
//                     cell: info => info.getValue(),
//                     header: () => 'City',
//                     size: 80,
//                 }),
//                 columnHelper.accessor('state' as any, {
//                     cell: info => info.getValue(),
//                     header: () => 'State',
//                     size: 50,
//                 }),
//             ];
//
//             // Create a custom row with many cells
//             const manyColumnsRow = {
//                 id: 'many-columns-row',
//                 original: manyColumnsData,
//                 getVisibleCells: () => manyColumns.map((column, index) => ({
//                     id: `many-columns-${index}`,
//                     column: {
//                         id: `col-${index}`,
//                         getSize: () => column.size || 100,
//                         columnDef: column
//                     },
//                     getContext: () => ({
//                         table: {},
//                         column: column,
//                         row: { original: manyColumnsData },
//                         getValue: () => {
//                             const key = column.accessorKey as string;
//                             return (manyColumnsData as any)[key];
//                         },
//                         renderValue: () => (manyColumnsData as any)[column.accessorKey as string],
//                     })
//                 }))
//             };
//
//             return (
//                 <div style={{ width: '100%', maxWidth: '1000px', overflowX: 'auto' }}>
//                     <TableRow row={manyColumnsRow} />
//                 </div>
//             );
//         }
//     ],
// };
//
// // Dark theme story
// export const DarkTheme: Story = {
//     args: {
//         row: createMockRow(mockPersons[0]),
//     },
//     decorators: [
//         (Story) => {
//             return (
//                 <div style={{
//                     backgroundColor: '#222',
//                     color: 'white',
//                     padding: '20px',
//                     borderRadius: '8px'
//                 }}>
//                     <Story />
//                 </div>
//             );
//         },
//     ],
// };
