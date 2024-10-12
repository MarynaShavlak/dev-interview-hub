import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    TableMeta,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Box } from '@/shared/ui/common/Box/Box';
import DATA from '../data';
import cls from './UsersTable.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { EditableCell } from '../EditableCell/EditableCell';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OptionCell } from '../OptionCell/OptionCell';

type Task = {
    task: string;
    status: { id: number; name: string; color: string };
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
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: OptionCell,
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
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
        align: 'center',
    });

    console.log('data', data);

    return (
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
                                    isResizing: header.column.getIsResizing(),
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
// import StatusCell from './StatusCell';
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
//         accessorKey: 'status',
//         header: 'Status',
//         cell: StatusCell,
//         enableSorting: false,
//         enableColumnFilter: true,
//         filterFn: (row, columnId, filterStatuses) => {
//             if (filterStatuses.length === 0) return true;
//             const status = row.getValue(columnId);
//             return filterStatuses.includes(status?.id);
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
