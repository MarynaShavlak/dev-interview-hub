import { flexRender, Row } from '@tanstack/react-table';
import { Box } from '@/shared/ui/common/Box';
import cls from './TableRow.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Each } from '@/shared/lib/components/Each/Each';

interface TableRowProps<T> {
    row: Row<T>;
}

export const TableRow = <T,>({ row }: TableRowProps<T>) => {
    const additionalCellClasses = getFlexClasses({
        vStack: true,
        justify: 'center',
    });
    return (
        <Box className={cls.tr} key={row.id}>
            <Each
                of={row.getVisibleCells()}
                render={(cell) => (
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
                )}
            />
        </Box>
    );
};
