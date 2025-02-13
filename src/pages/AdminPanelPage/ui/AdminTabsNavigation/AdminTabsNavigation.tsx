import React, { memo } from 'react';

import { AdminTabType } from '../../model/types/adminTabTypes';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AdminTabsNavigationRedesigned } from './AdminTabsNavigationRedesigned/AdminTabsNavigationRedesigned';
import { AdminTabsNavigationDeprecated } from './AdminTabsNavigationDeprecated/AdminTabsNavigationDeprecated';

export interface AdminTabsNavigationProps {
    activeTab: AdminTabType;
    onTabChange: (tab: AdminTabType) => void;
}

export const AdminTabsNavigation = memo((props: AdminTabsNavigationProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AdminTabsNavigationRedesigned {...props} />}
            off={<AdminTabsNavigationDeprecated {...props} />}
        />
    );
});
