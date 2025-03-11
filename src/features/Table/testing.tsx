import { createColumnHelper } from '@tanstack/react-table';
import { ColorOption } from './model/types/tableTypes';

export const navigateMock = (id: string) => console.log('Navigating to:', id);

export const mockSetColumnFilters = () => {
    alert('Column filters updated!');
};
export const rowMock = {
    original: { id: '1' },
};
export const columnMock = { id: 'status' };
export const colorOptions: ColorOption[] = [
    { id: '1', name: 'red', color: '#ff0000' },
    { id: '2', name: 'green', color: '#00ff00' },
    { id: '3', name: 'blue', color: '#0000ff' },
];

export const createPaginationData = (count: number) => {
    return Array(count)
        .fill(0)
        .map((_, index) => ({
            id: index + 1,
            name: `Item ${index + 1}`,
            description: `Description for item ${index + 1}`,
        }));
};

type Person = {
    firstName: string;
    lastName: string;
    age: number;
    status: 'active' | 'inactive';
};

export const mockPersons: Person[] = [
    { firstName: 'John', lastName: 'Doe', age: 30, status: 'active' },
    { firstName: 'Jane', lastName: 'Smith', age: 25, status: 'inactive' },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.accessor('firstName', {
        cell: (info) => info.getValue(),
        header: () => 'First Name',
        size: 100,
    }),
    columnHelper.accessor('lastName', {
        cell: (info) => info.getValue(),
        header: () => 'Last Name',
        size: 100,
    }),
    columnHelper.accessor('age', {
        cell: (info) => info.getValue(),
        header: () => 'Age',
        size: 50,
    }),
    columnHelper.accessor('status', {
        cell: (info) => (
            <span
                className={
                    info.getValue() === 'active'
                        ? 'text-green-500'
                        : 'text-red-500'
                }
            >
                {info.getValue()}
            </span>
        ),
        header: () => 'Status',
        size: 80,
    }),
];

export const createMockRow = (data: Person) => {
    return {
        id: `${data.firstName}-${data.lastName}`,
        original: data,
        getVisibleCells: () =>
            columns.map((column, index) => ({
                id: `${data.firstName}-${data.lastName}-${index}`,
                column: {
                    id: `col-${index}`,
                    getSize: () => column.size || 100,
                    columnDef: column,
                },
                getContext: () => ({
                    table: {},
                    column,
                    row: { original: data },
                    getValue: () => {
                        const key = column.accessorKey as keyof Person;
                        return data[key];
                    },
                    renderValue: () => data[column.accessorKey as keyof Person],
                }),
            })),
    };
};
