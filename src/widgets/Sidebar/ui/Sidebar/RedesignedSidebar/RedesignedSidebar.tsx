import { memo, ReactNode } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RedesignedSidebar.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface RedesignedSidebarProps {
    className?: string;
    collapsed: boolean;
    itemsList: ReactNode[];
    onToggle: () => void;
}

export const RedesignSidebar = memo((props: RedesignedSidebarProps) => {
    const { className, collapsed, itemsList, onToggle } = props;
    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsedRedesigned]: collapsed },
                [className],
            )}
        >
            <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                onClick={onToggle}
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
