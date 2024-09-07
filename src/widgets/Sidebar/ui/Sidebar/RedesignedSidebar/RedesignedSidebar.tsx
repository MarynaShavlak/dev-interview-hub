import { memo } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/common/Stack';
import { AppLogo } from '@/shared/ui/common/AppLogo';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './RedesignedSidebar.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Each } from '@/shared/lib/components/Each/Each';
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../../lib/hook/useSidebarItems/useSidebarItems';
import { useSidebarCollapse } from '../../../lib/hook/useSidebarCollapse/useSidebarCollapse';

interface RedesignedSidebarProps {
    className?: string;
}

export const RedesignedSidebar = memo((props: RedesignedSidebarProps) => {
    const { className } = props;
    const { collapsed, toggleCollapse } = useSidebarCollapse();
    const sidebarItemsList = useSidebarItems();
    const classes = classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
    );
    return (
        <aside data-testid="sidebar" className={classes}>
            <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
            <VStack role="navigation" gap="8" className={cls.items}>
                <Each
                    of={sidebarItemsList}
                    render={(item) => {
                        return (
                            <SidebarItem
                                item={item}
                                collapsed={collapsed}
                                key={item.path}
                            />
                        );
                    }}
                />
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                onClick={toggleCollapse}
                className={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
});
