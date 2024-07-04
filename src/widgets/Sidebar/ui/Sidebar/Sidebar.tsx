import { memo, useMemo, useState } from 'react';
import { useSidebarItems } from '../../lib/hook/useSidebarItems';
import { RedesignSidebar } from './RedesignedSidebar/RedesignedSidebar';
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSidebarItems();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <RedesignSidebar
                    className={className}
                    collapsed={collapsed}
                    onToggle={onToggle}
                    itemsList={itemsList}
                />
            }
            off={
                <DeprecatedSidebar
                    className={className}
                    collapsed={collapsed}
                    onToggle={onToggle}
                    itemsList={itemsList}
                />
            }
        />
    );
});
