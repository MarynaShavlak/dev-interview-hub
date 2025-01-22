import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@/shared/ui/common/Box';
import cls from './UserArticlesTable.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { CommonFilterType } from '../../model/types/types';
import { TablePagination } from '../TablePagination/TablePagination';
import { TableRow } from '../TableRow/TableRow';
import { Each } from '@/shared/lib/components/Each/Each';
import { TableHeader } from '../TableHeader/TableHeader';
import { useUserArticlesTableData } from '../../lib/hooks/useUserArticlesTableData';
import { VStack } from '@/shared/ui/common/Stack';
import { createStaticTextColumn } from '../../lib/helpers/columnCreators/createStaticColumn/createStaticTextColumn';
import { getUniqueOptions } from '../../lib/helpers/getData/getUniqueOptions/getUniqueOptions';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';

const columnHelper = createColumnHelper<UserArticlesTableInfo>();

const createUserTextCol = createStaticTextColumn<UserArticlesTableInfo>();

// const columns = [
//     columnHelper.accessor(
//         'title',
//         createUserTextCol({ id: 'title', size: 230, sortable: true }),
//     ),
//     columnHelper.accessor(
//         'createdAt',
//         createUserTextCol({ id: 'createdAt', size: 80, sortable: true }),
//     ),
//     columnHelper.accessor(
//         'categories',
//         createUserTextCol({
//             id: 'categories',
//             size: 200,
//             sortable: true,
//             filterable: true,
//         }),
//     ),
//
//     columnHelper.accessor(
//         'views',
//         createUserTextCol({ id: 'views', size: 80, sortable: true }),
//     ),
//     columnHelper.accessor(
//         'commentsQuantity',
//         createUserTextCol({
//             id: 'commentsQuantity',
//             size: 80,
//             sortable: true,
//         }),
//     ),
//     columnHelper.accessor(
//         'averageRating',
//         createUserTextCol({
//             id: 'averageRating',
//             size: 80,
//             sortable: true,
//             filterable: true,
//         }),
//     ),
// ];

export const UserArticlesTable = memo(() => {
    const { articles, isLoading } = useUserArticlesTableData();
    const { t } = useTranslation('articleDetails');

    const [data, setData] = useState<UserArticlesTableInfo[]>([]);
    console.log('data', data);

    const [columnFilters, setColumnFilters] = useState<CommonFilterType>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');

    useEffect(() => {
        if (!isLoading && articles.length !== data.length) {
            setData(articles); // Update data only if users has changed
        }
    }, [articles, isLoading, data.length]);

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

    const headerOptionsMapping: Record<string, string[]> = Object.fromEntries(
        (data.length > 0 ? Object.keys(data[0]) : []).map((field) => [
            field,
            getUniqueOptions(data, field as keyof UserArticlesTableInfo).filter(
                (option): option is string => option !== undefined,
            ),
        ]),
    );

    const columns = [
        columnHelper.accessor(
            'title',
            createUserTextCol({
                id: t('Заголовок статті'),
                size: 230,
                sortable: true,
            }),
        ),
        columnHelper.accessor(
            'createdAt',
            createUserTextCol({
                id: t('Дата створення'),
                size: 110,
                sortable: true,
            }),
        ),
        columnHelper.accessor(
            'categories',
            createUserTextCol({
                id: t('Категорії'),
                size: 185,
                sortable: true,
                filterable: true,
            }),
        ),

        columnHelper.accessor(
            'views',
            createUserTextCol({
                id: t('Перегляди'),
                size: 110,
                sortable: true,
            }),
        ),
        columnHelper.accessor(
            'commentsQuantity',
            createUserTextCol({
                id: t('Коментарі'),
                size: 110,
                sortable: true,
            }),
        ),
        columnHelper.accessor(
            'averageRating',
            createUserTextCol({
                id: t('Середній рейтинг'),
                size: 110,
                sortable: true,
                filterable: true,
            }),
        ),
    ];

    const table = useReactTable<UserArticlesTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 20,
            },
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
                            console.log('headerGroup', headerGroup);
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
});

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
