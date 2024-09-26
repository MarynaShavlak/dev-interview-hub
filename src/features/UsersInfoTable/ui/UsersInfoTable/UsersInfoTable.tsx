import React from 'react';
import cls from './UsersInfoTable.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';

interface Column<T> {
    Header: string;
    accessor: keyof T;
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
                                    {column.accessor === 'avatar' ? (
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
    // const columns = [
    //     { Header: 'ID', accessor: 'id' as keyof UserFullInfo },
    //     { Header: 'Avatar', accessor: 'avatar' as keyof UserFullInfo },
    //     { Header: 'Username', accessor: 'username' as keyof UserFullInfo },
    //     { Header: 'Full Name', accessor: 'fullName' as keyof UserFullInfo },
    //     { Header: 'Role', accessor: 'roles' as keyof UserFullInfo },
    //     { Header: 'Age', accessor: 'age' as keyof UserFullInfo },
    //     { Header: 'Currency', accessor: 'currency' as keyof UserFullInfo },
    //     { Header: 'Country', accessor: 'country' as keyof UserFullInfo },
    //     { Header: 'City', accessor: 'city' as keyof UserFullInfo },
    //     {
    //         Header: 'Features Enabled',
    //         accessor: 'features' as keyof UserFullInfo,
    //     },
    //     {
    //         Header: 'Articles Quantity',
    //         accessor: 'articlesQuantity' as keyof UserFullInfo,
    //     },
    // ];

    const columns = generateTableColumnsData(users);

    return <Table data={users} columns={columns} />;
};
