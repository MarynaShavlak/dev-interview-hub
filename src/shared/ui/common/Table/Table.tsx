import cls from './Table.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { Avatar } from '../../redesigned/Avatar';
import { Avatar as AvatarDeprecated } from '../../deprecated/Avatar';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';

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

const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.tableRedesigned,
    off: () => cls.tableDeprecated,
});

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

    const renderCellContent = (row: T, column: Column<T>) => {
        if (column.image) {
            const imageUrl = row[column.accessor] as string;

            return (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Avatar src={imageUrl} size={40} />}
                    off={<AvatarDeprecated src={imageUrl} size={40} />}
                />
            );
        }
        return String(row[column.accessor]);
    };

    const renderRow = (row: T, rowIndex: number) => (
        <tr key={rowIndex}>
            <Each
                of={columns}
                render={(column, colIndex) => (
                    <td key={colIndex}>{renderCellContent(row, column)}</td>
                )}
            />
        </tr>
    );

    return (
        <tbody>
            <Each
                of={data}
                render={(row, rowIndex) => renderRow(row, rowIndex)}
            />
        </tbody>
    );
};

export const Table = <T,>(props: TableProps<T>) => {
    const { data, columns, className } = props;
    if (!data.length) return null;

    return (
        <table className={classNames(mainClass, {}, [className])}>
            <TableHeader columns={columns} />
            <TableBody data={data} columns={columns} />
        </table>
    );
};
