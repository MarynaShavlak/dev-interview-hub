import { HStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/deprecated/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { ActionCellsListProps } from '../ActionCellsList';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export const ActionCellsListDeprecated = <TData extends { id: string }>({
    editRow,
    row,
    deleteRow,
}: ActionCellsListProps<TData>) => {
    const btnFlexClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });
    return (
        <HStack justify="center" gap="8">
            {deleteRow && (
                <Button
                    className={classNames('', {}, btnFlexClasses)}
                    theme={ButtonTheme.CLEAR}
                    onClick={() => deleteRow(row.original.id)}
                >
                    <Icon Svg={DeleteIcon} width={18} variant="error" />
                </Button>
            )}
            {editRow && (
                <Button
                    className={classNames('', {}, btnFlexClasses)}
                    theme={ButtonTheme.CLEAR}
                    onClick={() => editRow(row.original.id)}
                >
                    <Icon Svg={EditIcon} width={18} />
                </Button>
            )}
        </HStack>
    );
};
