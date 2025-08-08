import React, { memo } from 'react';
import { useSidebarItems } from '../../../lib/hooks/useSidebarItems/useSidebarItems';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import cls from './MobileSidebar.module.scss';

interface MobileSidebarProps {
    className?: string;
    onItemClick?: () => void;
}

export const MobileSidebar = memo((props: MobileSidebarProps) => {
    const { className, onItemClick } = props;
    const sidebarItemsList = useSidebarItems();
    const classes = classNames(cls.MobileSidebarRedesigned, {}, [
        className || '',
    ]);
    return (
        <aside className={classes}>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={false} className={cls.lang} />
            </div>
            <VStack role="navigation" gap="16" className={cls.items}>
                <Each
                    of={sidebarItemsList}
                    render={(item) => {
                        return (
                            <SidebarItem
                                item={item}
                                collapsed={false}
                                key={item.path}
                                onClick={onItemClick}
                            />
                        );
                    }}
                />
            </VStack>
        </aside>
    );
});
