import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { STATUSES } from '../data';
import { TableMetaCustom } from '../UsersTable/TaskTable';
import { Box } from '@/shared/ui/common/Box';
import cls from './OptionCell.module.scss';

export const ColorIcon = ({ color: string, ...props }) => (
    <Box
        width="12px"
        height="12px"
        backgroundColor={color}
        {...props}
        className={cls.colorIcon}
    />
);

type OptionCellProps<TData> = CellContext<TData, any>;

export const OptionCell = <TData,>({
    getValue,
    row,
    column,
    table,
}: OptionCellProps<TData>) => {
    const { name, color } = getValue() || {};
    const meta = table.options.meta as TableMetaCustom<TData>;
    const currentStatus = name;

    const onCellClick = useCallback(
        (newStatus: any) => {
            if (meta?.updateData && newStatus.name !== currentStatus) {
                meta.updateData(row.index, column.id, newStatus);
            }
        },
        [column.id, currentStatus, meta, row.index],
    );

    return (
        <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
            <MenuButton
                h="100%"
                w="100%"
                // textAlign="left"
                p={1.5}
                bg={color || 'transparent'}
                color="gray.900"
            >
                {name}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => onCellClick(null)}>
                    {/* <ColorIcon color="red.400" mr={3} /> */}
                    None
                </MenuItem>
                {STATUSES.map((status) => (
                    <MenuItem
                        key={status.id}
                        onClick={() => onCellClick(status)}
                    >
                        {/* <ColorIcon color={status.color} mr={3} /> */}
                        {status.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
