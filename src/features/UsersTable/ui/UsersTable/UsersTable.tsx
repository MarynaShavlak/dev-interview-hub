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
import { SearchInput } from '../SearchInput/SearchInput';
import { ColorOption, CommonFilterType } from '../../model/types/types';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeader } from '../TableHeader/TableHeader';
import { useUsersTableData } from '../../lib/hooks/useUsersTableData';
import { UsersTableInfo } from '../../model/types/usersTableInfo';
import { VStack } from '@/shared/ui/common/Stack';
import { createStaticTextColumn } from '../../lib/helpers/columnCreators/createStaticColumn/createStaticTextColumn';
import { createEditableColumn } from '../../lib/helpers/columnCreators/createEditableColumn/createEditableColumn';
import { createOptionColumn } from '../../lib/helpers/columnCreators/createOptionColumn/createOptionColumn';
import { createImageColumn } from '../../lib/helpers/columnCreators/createImageColumn/createImageColumn';
import { getUniqueOptions } from '../../lib/helpers/getData/getUniqueOptions/getUniqueOptions';

const columnHelper = createColumnHelper<UsersTableInfo>();

const createUserTextCol = createStaticTextColumn<UsersTableInfo>();
const createUserEditableCol = createEditableColumn<UsersTableInfo>();
const createUserOptionCol = createOptionColumn<UsersTableInfo>();
const createUserAvatarCol = createImageColumn<UsersTableInfo>();

const columns = [
    // columnHelper.accessor('id', createUserTextCol({ id: 'id', size: 40 })),
    columnHelper.accessor(
        'avatar',
        createUserAvatarCol({
            id: 'avatar',
            size: 40,
            className: cls.tableAvatar,
        }),
    ),
    columnHelper.accessor(
        'username',
        createUserEditableCol({ id: 'username', size: 120 }),
    ),
    columnHelper.accessor(
        'email',
        createUserEditableCol({ id: 'email', size: 120 }),
    ),
    columnHelper.accessor(
        'firstname',
        createUserEditableCol({ id: 'firstname', size: 120 }),
    ),
    columnHelper.accessor(
        'lastname',
        createUserEditableCol({ id: 'lastname', size: 120 }),
    ),

    columnHelper.accessor(
        'age',
        createUserTextCol({ id: 'age', size: 80, sortable: true }),
    ),
    columnHelper.accessor(
        'city',
        createUserEditableCol({ id: 'city', size: 100, sortable: false }),
    ),
    columnHelper.accessor(
        'country',
        createUserOptionCol({
            id: 'country',
            size: 110,
            options: ['Ukraine', 'Poland', 'Germany'],
            sortable: false,
        }),
    ),
    columnHelper.accessor(
        'currency',
        createUserOptionCol({
            id: 'currency',
            size: 110,
            options: ['UAH', 'EUR', 'USD'],
            sortable: false,
        }),
    ),
    columnHelper.accessor(
        'articlesQuantity',
        createUserTextCol({ id: 'articlesQuantity', size: 80, sortable: true }),
    ),

    columnHelper.accessor(
        'features',
        createUserTextCol({ id: 'features', size: 200 }),
    ),
    columnHelper.accessor(
        'role',
        createUserOptionCol({
            id: 'role',
            size: 110,
            options: USER_ROLE_OPTIONS,
            sortable: false,
        }),
    ),
    // createOptionColumn('role', USER_ROLE_OPTIONS),
];

export const UsersTable = () => {
    const { t } = useTranslation('admin');
    const { users, isLoading } = useUsersTableData();
    // console.log('users', users);
    const [data, setData] = useState<UsersTableInfo[]>([]);
    // console.log('data', data);

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');

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

    // const headerOptionsMapping: Record<string, (string | ColorOption)[]> =
    //     Object.fromEntries(
    //         Object.keys(data).map((field) => [
    //             field,
    //             getUniqueOptions(data, field as keyof UsersTableInfo).filter(
    //                 (option): option is string | ColorOption =>
    //                     option !== undefined,
    //             ),
    //         ]),
    //     );
    const headerOptionsMapping: Record<string, (string | ColorOption)[]> =
        Object.fromEntries(
            // Use Object.keys of the first data item if it exists, or empty array as fallback
            (data.length > 0 ? Object.keys(data[0]) : []).map((field) => [
                field,
                getUniqueOptions(data, field as keyof UsersTableInfo).filter(
                    (option): option is string | ColorOption =>
                        option !== undefined,
                ),
            ]),
        );

    const table = useReactTable<UsersTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        columnResizeMode: 'onChange',
        meta: { updateData },
    });

    return (
        <VStack gap="16">
            <SearchInput
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <VStack gap="16" className={cls.tableWrap}>
                <Box className={cls.table} width={table.getTotalSize()}>
                    <Each
                        of={table.getHeaderGroups()}
                        render={(headerGroup) => {
                            return (
                                <TableHeader
                                    key={headerGroup.id}
                                    headerGroup={headerGroup}
                                    setColumnFilters={setColumnFilters}
                                    headerOptionsMapping={headerOptionsMapping}
                                    columnFilters={columnFilters}
                                />
                            );
                        }}
                    />

                    <Each
                        of={table.getRowModel().rows}
                        render={(row) => <TableRow key={row.id} row={row} />}
                    />
                </Box>
                <TablePagination table={table} />
            </VStack>
        </VStack>
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
