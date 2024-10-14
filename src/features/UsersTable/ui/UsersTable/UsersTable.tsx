import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';
import { USER_ROLE_OPTIONS } from '../data';
import cls from './UsersTable.module.scss';
import { EditableCell } from '../EditableCell/EditableCell';
import { OptionCell } from '../OptionCell/OptionCell';
import { SearchInput } from '../InputSearch/SearchInput';
import { ColorOption, CommonFilterType } from '../../model/types/types';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeader } from '../TableHeader/TableHeader';
import { useUsersTableData } from '../../lib/hooks/useUsersTableData';
import { UsersTableInfo } from '../../model/types/usersTableInfo';

const columnHelper = createColumnHelper<UsersTableInfo>();

const columns = [
    columnHelper.accessor('id', {
        header: 'Id',
        size: 40,
        cell: (props) => <p>{props.getValue()}</p>,
        enableColumnFilter: false,
        enableSorting: false,
    }),
    columnHelper.accessor('username', {
        header: 'Username',
        cell: EditableCell,
        size: 120,
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),
    columnHelper.accessor('firstname', {
        header: 'First Name',
        cell: EditableCell,
        size: 120,
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),
    columnHelper.accessor('lastname', {
        header: 'Last Name',
        cell: EditableCell,
        size: 120,
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),

    columnHelper.accessor('age', {
        header: 'Age',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 80,
        enableColumnFilter: false,
    }),
    columnHelper.accessor('city', {
        header: 'City',
        cell: EditableCell,
        size: 100,
        enableColumnFilter: true,
        enableSorting: false,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),
    columnHelper.accessor('country', {
        header: 'Country',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 100,
        enableColumnFilter: true,
        enableSorting: false,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),
    columnHelper.accessor('currency', {
        header: 'Currency',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 100,
        enableColumnFilter: true,
        enableSorting: false,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            return filterRoles.includes(row.getValue(columnId));
        },
    }),
    columnHelper.accessor('articlesQuantity', {
        header: 'Articles Quantity',
        cell: (props) => <p>{props.getValue()}</p>,
        size: 80,
        enableColumnFilter: false,
    }),

    // columnHelper.accessor('features', {
    //     header: 'Features',
    //     cell: EditableCell,
    //     size: 250,
    //     enableColumnFilter: true,
    //     filterFn: 'includesString',
    // }),
    columnHelper.accessor('role', {
        header: 'Role',
        cell: (props) => <OptionCell {...props} options={USER_ROLE_OPTIONS} />,
        enableColumnFilter: true,
        enableSorting: false,
        size: 110,
        filterFn: (row, columnId, filterRoles) => {
            if (filterRoles.length === 0) return true;
            const role: ColorOption = row.getValue(columnId);
            return filterRoles.includes(role?.id);
        },
    }),

    // columnHelper.accessor('avatar', {
    //     header: 'Avatar',
    //     cell: (props) => (
    //         <img
    //             src={props.getValue()}
    //             alt="Avatar"
    //             style={{ width: 50, height: 50 }}
    //         />
    //     ),
    //     size: 100,
    //     enableColumnFilter: false,
    // }),
];

export const UsersTable = () => {
    const { t } = useTranslation();
    const { users, isLoading } = useUsersTableData();
    // console.log('users', users);
    const [data, setData] = useState<UsersTableInfo[]>([]);

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);

    useEffect(() => {
        if (!isLoading && users.length !== data.length) {
            setData(users); // Update data only if users has changed
        }
    }, [users, isLoading, data.length]);

    const updateData = useCallback(
        (rowIndex: number, columnId: string, value: any) => {
            console.log('update data');
            setData((prevData) =>
                prevData.map((row, index) =>
                    index === rowIndex ? { ...row, [columnId]: value } : row,
                ),
            );
            console.log('data after update: ', data);
        },
        [data],
    );

    const table = useReactTable<UsersTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: 'onChange',
        meta: { updateData },
    });

    return (
        <Box>
            <SearchInput
                filterCategory="username"
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
            <Box className={cls.table} width={table.getTotalSize()}>
                <Each
                    of={table.getHeaderGroups()}
                    render={(headerGroup) => (
                        <TableHeader
                            key={headerGroup.id}
                            headerGroup={headerGroup}
                            setColumnFilters={setColumnFilters}
                            data={data}
                            columnFilters={columnFilters}
                        />
                    )}
                />

                <Each
                    of={table.getRowModel().rows}
                    render={(row) => <TableRow key={row.id} row={row} />}
                />
            </Box>
            <TablePagination table={table} />
        </Box>
    );
};

// import {
//     createColumnHelper,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from '@tanstack/react-table';
// import { useCallback, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Box } from '@/shared/ui/common/Box';
// import DATA, { USER_ROLE_OPTIONS } from '../data';
// import cls from './UsersTable.module.scss';
// import { EditableCell } from '../EditableCell/EditableCell';
// import { OptionCell } from '../OptionCell/OptionCell';
// import { SearchInput } from '../InputSearch/SearchInput';
// import { ColorOption } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
// import { CommonFilterType } from '../../model/types/types';
// import { TablePagination } from '../TablePagination/TablePagination';
// import { TableRow } from '../TableRow/TableRow';
// import { Each } from '@/shared/lib/components/Each/Each';
// import { TableHeader } from '../TableHeader/TableHeader';
// import { useUsersTableData } from '../../lib/hooks/useUsersTableData';
//
// type Task = {
//     task: string;
//     role: ColorOption;
//     due: Date | null;
//     notes: string;
// };
//
// const columnHelper = createColumnHelper<Task>();
//
// const columns = [
//     columnHelper.accessor('task', {
//         header: 'Task',
//         cell: EditableCell,
//         size: 225,
//         enableColumnFilter: true,
//         filterFn: 'includesString',
//     }),
//     columnHelper.accessor('role', {
//         header: 'Role',
//         cell: (props) => <OptionCell {...props} options={USER_ROLE_OPTIONS} />,
//         enableColumnFilter: true,
//         enableSorting: false,
//         filterFn: (row, columnId, filterRoles) => {
//             if (filterRoles.length === 0) return true;
//             const role: ColorOption = row.getValue(columnId);
//             return filterRoles.includes(role?.id);
//         },
//     }),
//     columnHelper.accessor('due', {
//         header: 'Due',
//         cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
//     }),
//     columnHelper.accessor('notes', {
//         header: 'Notes',
//         cell: (props) => <p>{props.getValue()}</p>,
//     }),
// ];
//
// export const UsersTable = () => {
//     const { t } = useTranslation();
//     const { users, isLoading } = useUsersTableData();
//     console.log('users', users);
//     const [data, setData] = useState<Task[]>(DATA);
//
//     const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
//
//     const updateData = useCallback(
//         (rowIndex: number, columnId: string, value: any) => {
//             setData((prevData) =>
//                 prevData.map((row, index) =>
//                     index === rowIndex ? { ...row, [columnId]: value } : row,
//                 ),
//             );
//         },
//         [],
//     );
//
//     const table = useReactTable<Task>({
//         data,
//         columns,
//         state: {
//             columnFilters,
//         },
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         columnResizeMode: 'onChange',
//         meta: { updateData },
//     });
//
//     return (
//         <Box>
//             <SearchInput
//                 filterCategory="task"
//                 columnFilters={columnFilters}
//                 setColumnFilters={setColumnFilters}
//             />
//             <Box className={cls.table} width={table.getTotalSize()}>
//                 <Each
//                     of={table.getHeaderGroups()}
//                     render={(headerGroup) => (
//                         <TableHeader
//                             key={headerGroup.id}
//                             headerGroup={headerGroup}
//                             setColumnFilters={setColumnFilters}
//                             allOptions={USER_ROLE_OPTIONS}
//                             columnFilters={columnFilters}
//                         />
//                     )}
//                 />
//
//                 <Each
//                     of={table.getRowModel().rows}
//                     render={(row) => <TableRow key={row.id} row={row} />}
//                 />
//             </Box>
//             <TablePagination table={table} />
//         </Box>
//     );
// };
