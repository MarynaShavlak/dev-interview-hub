import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    TableMeta,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Box } from '@/shared/ui/common/Box/Box';
import DATA, { USER_ROLE_OPTIONS } from '../data';
import cls from './UsersTable.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { EditableCell } from '../EditableCell/EditableCell';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OptionCell } from '../OptionCell/OptionCell';
import { SearchInput } from '../InputSearch/SearchInput';
import { FilterPopover } from '../FilterPopover/FilterPopover';
import { ColorOption } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { CommonFilterType } from '../../model/types/types';

type Task = {
    task: string;
    role: ColorOption;
    due: Date | null;
    notes: string;
};

export interface TableMetaCustom<TData> extends TableMeta<TData> {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
}

const columnHelper = createColumnHelper<Task>();

const columns = [
    columnHelper.accessor('task', {
        header: 'Task',
        cell: EditableCell,
        size: 225,
        enableColumnFilter: true,
        filterFn: 'includesString',
    }),
    columnHelper.accessor('role', {
        header: 'Role',
        cell: (props) => (
            <OptionCell {...props} options={USER_ROLE_OPTIONS} /> // Pass options here
        ),
        enableColumnFilter: true,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            const role: ColorOption = row.getValue(columnId);
            return filterRoles.includes(role?.id);
        },
    }),
    columnHelper.accessor('due', {
        header: 'Due',
        cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    }),
    columnHelper.accessor('notes', {
        header: 'Notes',
        cell: (props) => <p>{props.getValue()}</p>,
    }),
];

export const TaskTable = () => {
    const [data, setData] = useState<Task[]>(DATA);
    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    // const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
        columnResizeMode: 'onChange',
        meta: {
            updateData: (rowIndex: number, columnId: string, value: any) => {
                setData((prevData) =>
                    prevData.map((row, index) =>
                        index === rowIndex
                            ? { ...row, [columnId]: value }
                            : row,
                    ),
                );
            },
        },
    });

    const additionalCellClasses = getFlexClasses({
        vStack: true,
        justify: 'center',
        // align: 'center',
    });

    console.log('data', data);

    return (
        <Box>
            <SearchInput
                filterCategory="task"
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <FilterPopover
                filterCategory="role"
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                allOptions={USER_ROLE_OPTIONS}
            />
            <Box className={cls.table} width={table.getTotalSize()}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Box className={cls.tr} key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Box
                                className={cls.th}
                                key={header.id}
                                width={header.getSize()}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                                <Box
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={classNames(cls.resizer, {
                                        isResizing:
                                            header.column.getIsResizing(),
                                    })}
                                />
                            </Box>
                        ))}
                    </Box>
                ))}
                {table.getRowModel().rows.map((row) => (
                    <Box className={cls.tr} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Box
                                className={classNames(cls.td, {}, [
                                    ...additionalCellClasses,
                                ])}
                                key={cell.id}
                                width={cell.column.getSize()}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

// import { useState } from 'react';
// import { Box, Button, ButtonGroup, Icon, Text } from '@chakra-ui/react';
// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from '@tanstack/react-table';
// import DATA from '../data';
// import EditableCell from './EditableCell';
// import roleCell from './roleCell';
// import DateCell from './DateCell';
// import Filters from './Filters';
// import SortIcon from './icons/SortIcon';
//
// const columns = [
//     {
//         accessorKey: 'task',
//         header: 'Task',
//         size: 225,
//         cell: EditableCell,
//         enableColumnFilter: true,
//         filterFn: 'includesString',
//     },
//     {
//         accessorKey: 'role',
//         header: 'role',
//         cell: roleCell,
//         enableSorting: false,
//         enableColumnFilter: true,
//         filterFn: (row, columnId, filterrolees) => {
//             if (filterrolees.length === 0) return true;
//             const role = row.getValue(columnId);
//             return filterrolees.includes(role?.id);
//         },
//     },
//     {
//         accessorKey: 'due',
//         header: 'Due',
//         cell: DateCell,
//     },
//     {
//         accessorKey: 'notes',
//         header: 'Notes',
//         size: 225,
//         cell: EditableCell,
//     },
// ];
//
// export const TaskTable = () => {
//     const [data, setData] = useState(DATA);
//     const [columnFilters, setColumnFilters] = useState([]);
//
//     const table = useReactTable({
//         data,
//         columns,
//         state: {
//             columnFilters,
//         },
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         columnResizeMode: 'onChange',
//         meta: {
//             updateData: (rowIndex, columnId, value) =>
//                 setData((prev) =>
//                     prev.map((row, index) =>
//                         index === rowIndex
//                             ? {
//                                   ...prev[rowIndex],
//                                   [columnId]: value,
//                               }
//                             : row,
//                     ),
//                 ),
//         },
//     });
//
//     return (
//         <Box>
//             <Filters
//                 columnFilters={columnFilters}
//                 setColumnFilters={setColumnFilters}
//             />
//             <Box className="table" w={table.getTotalSize()}>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                     <Box className="tr" key={headerGroup.id}>
//                         {headerGroup.headers.map((header) => (
//                             <Box
//                                 className="th"
//                                 w={header.getSize()}
//                                 key={header.id}
//                             >
//                                 {header.column.columnDef.header}
//                                 {header.column.getCanSort() && (
//                                     <Icon
//                                         as={SortIcon}
//                                         mx={3}
//                                         fontSize={14}
//                                         onClick={header.column.getToggleSortingHandler()}
//                                     />
//                                 )}
//                                 {
//                                     {
//                                         asc: ' 🔼',
//                                         desc: ' 🔽',
//                                     }[header.column.getIsSorted()]
//                                 }
//                                 <Box
//                                     onMouseDown={header.getResizeHandler()}
//                                     onTouchStart={header.getResizeHandler()}
//                                     className={`resizer ${
//                                         header.column.getIsResizing()
//                                             ? 'isResizing'
//                                             : ''
//                                     }`}
//                                 />
//                             </Box>
//                         ))}
//                     </Box>
//                 ))}
//                 {table.getRowModel().rows.map((row) => (
//                     <Box className="tr" key={row.id}>
//                         {row.getVisibleCells().map((cell) => (
//                             <Box
//                                 className="td"
//                                 w={cell.column.getSize()}
//                                 key={cell.id}
//                             >
//                                 {flexRender(
//                                     cell.column.columnDef.cell,
//                                     cell.getContext(),
//                                 )}
//                             </Box>
//                         ))}
//                     </Box>
//                 ))}
//             </Box>
//             <br />
//             <Text mb={2}>
//                 Page {table.getState().pagination.pageIndex + 1} of{' '}
//                 {table.getPageCount()}
//             </Text>
//             <ButtonGroup size="sm" isAttached variant="outline">
//                 <Button
//                     onClick={() => table.previousPage()}
//                     isDisabled={!table.getCanPreviousPage()}
//                 >
//                     {'<'}
//                 </Button>
//                 <Button
//                     onClick={() => table.nextPage()}
//                     isDisabled={!table.getCanNextPage()}
//                 >
//                     {'>'}
//                 </Button>
//             </ButtonGroup>
//         </Box>
//     );
// };
