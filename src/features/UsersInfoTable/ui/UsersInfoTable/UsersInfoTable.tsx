import React from 'react';
import cls from './UsersInfoTable.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';

interface Column<T> {
    Header: string;
    accessor: keyof T;
    image: Boolean;
}

interface TableProps<T> {
    className?: string;
    data: T[];
    columns: Column<T>[];
}

interface TableHeaderProps<T> extends Pick<TableProps<T>, 'columns'> {}
interface TableBodyProps<T> extends Omit<TableProps<T>, 'className'> {}

const TableHeader = <T,>(props: TableHeaderProps<T>) => {
    const { columns } = props;
    return (
        <thead>
            <tr>
                <Each
                    of={columns}
                    render={(column, index) => (
                        <th key={index}>{column.Header}</th>
                    )}
                />
            </tr>
        </thead>
    );
};

const TableBody = <T,>(props: TableBodyProps<T>) => {
    const { data, columns } = props;
    return (
        <tbody>
            <Each
                of={data}
                render={(row, rowIndex) => (
                    <tr key={rowIndex}>
                        <Each
                            of={columns}
                            render={(column, colIndex) => (
                                <td key={colIndex}>
                                    {column.image ? (
                                        <Avatar
                                            src={row[column.accessor] as string}
                                            size={40}
                                        />
                                    ) : (
                                        String(row[column.accessor])
                                    )}
                                </td>
                            )}
                        />
                    </tr>
                )}
            />
        </tbody>
    );
};

export const Table = <T,>(props: TableProps<T>) => {
    const { data, columns, className } = props;
    if (!data.length) return null;

    return (
        <table className={`${cls.Table} ${className || ''}`}>
            <TableHeader columns={columns} />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export const UsersInfoTable = () => {
    const { users } = useUsersFullData();
    console.log(users);

    const columns = generateTableColumnsData(users);
    console.log(columns);

    return <Table data={users} columns={columns} />;
};
