import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CalendarIcon from './icons/CalendarIcon';
import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import cls from './DateCell.module.scss';
import { TableMetaCustom } from '../../model/types/types';

export type DateCellProps<TData> = CellContext<TData, Date>;

// const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
//     <Center ref={ref} onClick={onClick} cursor="pointer">
//         {value ? (
//             <>
//                 {value}
//                 <Box
//                     pos="absolute"
//                     right={3}
//                     fontSize="md"
//                     color="red.300"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         clearDate();
//                     }}
//                 >
//                     &times;
//                 </Box>
//             </>
//         ) : (
//             <Icon as={CalendarIcon} fontSize="xl" />
//         )}
//     </Center>
// ));

export const DateCell = <TData,>({
    getValue,
    row,
    column,
    table,
}: DateCellProps<TData>) => {
    const date = getValue();
    const meta = table.options.meta as TableMetaCustom<TData>;
    const { updateData } = meta;

    const onChangeDate = useCallback(
        (selectedDate: Date | null) => {
            updateData(row.index, column.id, selectedDate);
        },
        [updateData, row.index, column.id],
    );

    const clearDate = useCallback(() => {
        onChangeDate(null);
    }, [onChangeDate]);

    return (
        <DatePicker
            wrapperClassName={cls.dateWrapper}
            dateFormat="MMM d"
            selected={date}
            onChange={onChangeDate}
            // customInput={<DateCustomInput clearDate={} />}
        />
    );
};
