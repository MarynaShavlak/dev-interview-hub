import { memo } from 'react';
import { SidebarRedesigned } from './SidebarRedesigned/SidebarRedesigned';
import { SidebarDeprecated } from './SidebarDeprecated/SidebarDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<SidebarRedesigned className={className} />}
            off={<SidebarDeprecated className={className} />}
        />
    );
});
