import cls from './Table.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';

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
                                    {String(row[column.accessor])}
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
