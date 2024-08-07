import { memo } from 'react';
import { RedesignedSidebar } from './RedesignedSidebar/RedesignedSidebar';
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedSidebar className={className} />}
            off={<DeprecatedSidebar className={className} />}
        />
    );
});
