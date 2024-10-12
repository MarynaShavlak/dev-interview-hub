import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { TableMetaCustom } from '../UsersTable/TaskTable';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Role } from '../../model/types/types';
import { ColorIndicatorOptionItem } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';

interface OptionCellProps<TData> extends CellContext<TData, any> {
    options: Role[];
}

export const OptionCell = <TData,>({
    getValue,
    row,
    column,
    table,
    options,
}: OptionCellProps<TData>) => {
    const { name } = getValue() || {};
    const meta = table.options.meta as TableMetaCustom<TData>;
    const currentValue = name;

    const listBoxOptions = options.map((option) => ({
        value: `${option.name}`,
        content: <ColorIndicatorOptionItem option={option} />,
    }));

    // console.log('listBoxOptions', listBoxOptions);
    const onCellClick = useCallback(
        (selectedValue: string | null) => {
            const newValue = options.find(
                (option) => option.name === selectedValue,
            );
            if (meta?.updateData && newValue?.name !== currentValue) {
                meta.updateData(row.index, column.id, newValue);
            }
        },
        [column.id, currentValue, meta, options, row.index],
    );

    const props = {
        value: name,
        defaultValue: name,
        items: listBoxOptions,
        onChange: onCellClick,
        direction: 'bottom right' as const,
    };

    return <ListBox {...props} />;
};

// <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
//     <MenuButton
//         h="100%"
//         w="100%"
//         // textAlign="left"
//         p={1.5}
//         bg={color || 'transparent'}
//         color="gray.900"
//     >
//         {name}
//     </MenuButton>
//     <MenuList>
//         <MenuItem onClick={() => onCellClick(null)}>
//             <ColorIcon color="red" />
//             None
//         </MenuItem>
//         {STATUSES.map((status) => (
//             <MenuItem
//                 key={status.id}
//                 onClick={() => onCellClick(status)}
//             >
//                 <ColorIcon color={status.color} />
//                 {status.name}
//             </MenuItem>
//         ))}
//     </MenuList>
// </Menu>

// export const OptionCell = <TData,>({
//     getValue,
//     row,
//     column,
//     table,
// }: OptionCellProps<TData>) => {
//     const { name, color } = getValue() || {};
//     const meta = table.options.meta as TableMetaCustom<TData>;
//     const currentStatus = name;
//
//     const onCellClick = useCallback(
//         (newStatus: any) => {
//             if (meta?.updateData && newStatus.name !== currentStatus) {
//                 meta.updateData(row.index, column.id, newStatus);
//             }
//         },
//         [column.id, currentStatus, meta, row.index],
//     );
//
//     return (
//         <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
//             <MenuButton
//                 h="100%"
//                 w="100%"
//                 // textAlign="left"
//                 p={1.5}
//                 bg={color || 'transparent'}
//                 color="gray.900"
//             >
//                 {name}
//             </MenuButton>
//             <MenuList>
//                 <MenuItem onClick={() => onCellClick(null)}>
//                     <ColorIcon color="red" />
//                     None
//                 </MenuItem>
//                 {STATUSES.map((status) => (
//                     <MenuItem
//                         key={status.id}
//                         onClick={() => onCellClick(status)}
//                     >
//                         <ColorIcon color={status.color} />
//                         {status.name}
//                     </MenuItem>
//                 ))}
//             </MenuList>
//         </Menu>
//     );
// };
