import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { SearchInput } from '@/features/Table';
import cls from '../TableActionBar.module.scss';
import { Button, ButtonSize } from '@/shared/ui/deprecated/Button';
import { TableActionBarProps } from '../TableActionBar';

export const TableActionBarDeprecated = memo((props: TableActionBarProps) => {
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
                    size={ButtonSize.S}
                    onClick={toggleEditRoleMode}
                    className={cls.editRoleButton}
                >
                    {!isEditRoleMode
                        ? t('Редагувати ролі користувачів')
                        : t('Перейти в режим читання')}
                </Button>
            )}
        </HStack>
    );
});
