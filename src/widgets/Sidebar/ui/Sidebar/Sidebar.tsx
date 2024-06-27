import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RedesignSidebar } from './RedesignedSidebar/RedesignedSidebar';
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

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
