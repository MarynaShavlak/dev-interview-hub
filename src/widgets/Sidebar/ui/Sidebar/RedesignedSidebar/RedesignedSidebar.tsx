import { memo, ReactNode } from 'react';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RedesignedSidebar.module.scss';

interface RedesignedSidebarProps {
    className?: string;
    collapsed: boolean;
    itemsList: ReactNode[];
}

export const RedesignSidebar = memo((props: RedesignedSidebarProps) => {
    const { className, collapsed, itemsList } = props;
    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsed]: collapsed },
                [className],
            )}
        >
            <AppLogo />
            {itemsList}
        </aside>
    );
});
