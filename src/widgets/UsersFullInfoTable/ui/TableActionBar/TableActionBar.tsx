import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { SearchInput } from '@/features/Table';
import cls from './TableActionBar.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';

interface TableActionBarProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
    isEditRoleMode: boolean;
    toggleEditRoleMode: () => void;
    isToggleBtnShown: boolean;
}

export const TableActionBar = memo((props: TableActionBarProps) => {
    const {
        isEditRoleMode,
        toggleEditRoleMode,
        isToggleBtnShown,
        ...otherProps
    } = props;
    const { t } = useTranslation('admin');
    return (
        <HStack justify="between" max>
            <SearchInput {...otherProps} />
            {isToggleBtnShown && (
                <Button
                    size="s"
                    onClick={toggleEditRoleMode}
                    className={cls.editRoleButton}
                    variant="save"
                >
                    {!isEditRoleMode
                        ? t('Редагувати ролі користувачів')
                        : t('Перейти в режим читання')}
                </Button>
            )}
        </HStack>
    );
});
