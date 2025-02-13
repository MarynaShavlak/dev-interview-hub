import { flexRender, Row } from '@tanstack/react-table';
import { Box } from '@/shared/ui/common/Box';
import cls from './TableRow.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Each } from '@/shared/lib/components/Each/Each';
import { toggleFeatures } from '@/shared/lib/features';

interface TableRowProps<T> {
    row: Row<T>;
}

export const TableRow = <T,>({ row }: TableRowProps<T>) => {
    const additionalCellClasses = getFlexClasses({
        vStack: true,
        justify: 'center',
    });

    const tdClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.tdRedesigned,
        off: () => cls.tdDeprecated,
    });
    return (
        <Box className={cls.tr} key={row.id}>
            <Each
                of={row.getVisibleCells()}
                render={(cell) => (
                    <Box
                        className={classNames(tdClass, {}, [
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
