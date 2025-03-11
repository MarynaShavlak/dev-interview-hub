import { createColumnHelper, Header, HeaderGroup } from '@tanstack/react-table';
import { ColorOption, CommonFilterType } from './model/types/tableTypes';

export const mockSortDefaultColumn = {
    getIsSorted: () => null, // Change to 'asc' or 'desc' to test sorting states
    getCanSort: () => true,
    getToggleSortingHandler: () => () => alert('Sorting toggled!'),
};
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
export const stringOptions: string[] = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
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

export const createMockHeader = (): Header<any, unknown> => {
    // Create a proper column object first
    const column = {
        id: 'name',
        getIsSorted: () => false,
        getCanSort: () => true,
        getToggleSortingHandler: () => () => console.log('Toggle sorting'),
    };

    return {
        id: 'name',
        column,
        getContext: () => ({
            column,
            table: {
                options: {
                    meta: {},
                },
            },
            header: {
                id: 'name',
            },
        }),
        colSpan: 1,
        rowSpan: 1,
        subHeaders: [],
        getLeafHeaders: () => [],
        isPlaceholder: false,
        placeholderId: '',
        depth: 0,
        index: 0,
    } as unknown as Header<any, unknown>;
};

export const createMockHeaderGroup = (
    withResizing = false,
    canSort = true,
    canFilter = true,
): HeaderGroup<any> => {
    // Create headers array with mock columns
    const headers = [
        {
            id: 'name',
            column: {
                id: 'name',
                columnDef: {
                    header: 'Name',
                },
                getCanSort: () => canSort,
                getCanFilter: () => canFilter,
                getIsResizing: () => false,
                getIsSorted: () => false,
                getToggleSortingHandler: () => () =>
                    console.log('Toggle sorting for Name'),
                getSize: () => 150,
            },
            getContext: () => ({
                column: {
                    id: 'name',
                    columnDef: {
                        header: 'Name',
                    },
                },
                table: {
                    options: {
                        meta: {},
                    },
                },
                header: {
                    id: 'name',
                },
            }),
            getSize: () => 150,
            getResizeHandler: () => () => console.log('Resize Name column'),
        },
        {
            id: 'age',
            column: {
                id: 'age',
                columnDef: {
                    header: 'Age',
                },
                getCanSort: () => canSort,
                getCanFilter: () => false, // Age doesn't have filter
                getIsResizing: () => withResizing,
                getIsSorted: () => (withResizing ? 'asc' : false),
                getToggleSortingHandler: () => () =>
                    console.log('Toggle sorting for Age'),
                getSize: () => 100,
            },
            getContext: () => ({
                column: {
                    id: 'age',
                    columnDef: {
                        header: 'Age',
                    },
                },
                table: {
                    options: {
                        meta: {},
                    },
                },
                header: {
                    id: 'age',
                },
            }),
            getSize: () => 100,
            getResizeHandler: () => () => console.log('Resize Age column'),
        },
        {
            id: 'status',
            column: {
                id: 'status',
                columnDef: {
                    header: 'Status',
                },
                getCanSort: () => canSort,
                getCanFilter: () => canFilter,
                getIsResizing: () => false,
                getIsSorted: () => (withResizing ? false : 'desc'),
                getToggleSortingHandler: () => () =>
                    console.log('Toggle sorting for Status'),
                getSize: () => 120,
            },
            getContext: () => ({
                column: {
                    id: 'status',
                    columnDef: {
                        header: 'Status',
                    },
                },
                table: {
                    options: {
                        meta: {},
                    },
                },
                header: {
                    id: 'status',
                },
            }),
            getSize: () => 120,
            getResizeHandler: () => () => console.log('Resize Status column'),
        },
    ];

    return {
        id: 'header-group-1',
        headers,
        getHeaderGroupProps: () => ({}),
    } as unknown as HeaderGroup<any>;
};

export const mockColumnFilters: CommonFilterType = [
    { id: 'name', value: ['Option 1'] },
    { id: 'status', value: ['Active', 'Pending'] },
] as CommonFilterType;

export const mockHeaderOptionsMapping: Record<string, string[]> = {
    name: ['Option 1', 'Option 2', 'Option 3'],
    status: ['Active', 'Pending', 'Inactive'],
};

export const mockHeaderOptionsWithColors: Record<
    string,
    (string | ColorOption)[]
> = {
    name: ['Option 1', 'Option 2', 'Option 3'],
    status: [
        { id: 'active', name: 'Active', color: '#4CAF50' },
        { id: 'pending', name: 'Pending', color: '#FFC107' },
        { id: 'inactive', name: 'Inactive', color: '#F44336' },
    ],
};
