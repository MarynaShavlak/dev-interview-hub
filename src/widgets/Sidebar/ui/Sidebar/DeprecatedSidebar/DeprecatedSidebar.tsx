import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';
import cls from './DeprecatedSidebar.module.scss';

interface DeprecatedSidebarProps {
    className?: string;
    collapsed: boolean;
    onToggle: () => void;
    itemsList: ReactNode[];
}

export const DeprecatedSidebar = memo((props: DeprecatedSidebarProps) => {
    const { className, collapsed, onToggle, itemsList } = props;
    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
});
