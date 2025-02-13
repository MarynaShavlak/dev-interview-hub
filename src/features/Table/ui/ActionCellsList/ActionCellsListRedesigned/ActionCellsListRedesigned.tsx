import { HStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { ActionCellsListProps } from '../ActionCellsList';

export const ActionCellsListRedesigned = <TData extends { id: string }>({
    editRow,
    row,
    deleteRow,
}: ActionCellsListProps<TData>) => {
    return (
        <HStack justify="center" gap="8">
            {deleteRow && (
                <Icon
                    Svg={DeleteIcon}
                    width={18}
                    variant="error"
                    clickable
                    onClick={() => deleteRow(row.original.id)}
                />
            )}
            {editRow && (
                <Icon
                    Svg={EditIcon}
                    width={18}
                    clickable
                    onClick={() => editRow(row.original.id)}
                />
            )}
        </HStack>
    );
};
