import { flexRender, HeaderGroup } from '@tanstack/react-table';

import { Box } from '@/shared/ui/common/Box';
import cls from './TableHeader.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { SortingIcon } from '../SortingIcon/SortingIcon';
import { TableFilter } from '../TableFilter/TableFilter';
import {
    ColumnFilterHandlerProps,
    CommonFilterType,
} from '../../model/types/types';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { HStack } from '@/shared/ui/common/Stack';
import { UsersTableInfo } from '../../model/types/usersTableInfo';
import { Currency } from '@/entities/Currency';

const ROLE_ADMIN = { id: '1', name: 'Admin', color: '#f77' };
const ROLE_USER = {
    id: '2',
    name: 'User',
    color: '#62de85',
};
const ROLE_MANAGER = { id: '3', name: 'Manager', color: '#5ed3f3' };
export const uniqueRoles = [ROLE_ADMIN, ROLE_USER, ROLE_MANAGER];

interface TableHeaderProps<T> extends ColumnFilterHandlerProps {
    headerGroup: HeaderGroup<T>;
    columnFilters: CommonFilterType;
    data: UsersTableInfo[];
    // allOptions: ColorOption[];
}

export const TableHeader = <T,>(props: TableHeaderProps<T>) => {
    const { headerGroup, setColumnFilters, columnFilters, data } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        justify: 'center',
        align: 'center',
    });

    const uniqueCurrencies: Currency[] = [
        ...new Set(data.map((user) => user.currency as Currency)),
    ];
    const getAllOptions = (headerId: string) => {
        switch (headerId) {
            case 'role':
                return uniqueRoles;
            // case 'currency':
            //     return uniqueCurrencies;
            case 'username':
                return [...new Set(data.map((user) => user.username))];
            default:
                return []; // Default empty if not recognized
        }
    };

    return (
        <Box className={cls.tr} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <Box
                    className={classNames(cls.th, {}, [...additionalClasses])}
                    key={header.id}
                    width={header.getSize()}
                >
                    <HStack gap="4">
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                        )}

                        {header.column.getCanSort() && (
                            <SortingIcon column={header.column} />
                        )}
                    </HStack>

                    {header.column.getCanFilter() && (
                        <TableFilter
                            filterCategory={header.id}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                            allOptions={getAllOptions(header.id)}
                        />
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
    );
};
