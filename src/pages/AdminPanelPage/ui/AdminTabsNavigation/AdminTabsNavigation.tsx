import React, { useMemo } from 'react';

import { Tabs } from '@/shared/ui/redesigned/Tabs';
import cls from './AdminTabsNavigation.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { AdminTabType } from '../../model/types/adminTabTypes';
import { useAdminTabs } from '../../lib/hook/useAdminTabs/useAdminTabs';

interface AdminTabsNavigationProps {
    activeTab: AdminTabType;
    onTabChange: (tab: AdminTabType) => void;
}

export const AdminTabsNavigation = ({
    activeTab,
    onTabChange,
}: AdminTabsNavigationProps) => {
    const rawAdminTabs = useAdminTabs();
    const adminTabs = useMemo(() => rawAdminTabs, [rawAdminTabs]);
    return (
        <HStack justify="between" max className={cls.tabsWrap}>
            <Tabs
                tabs={adminTabs}
                value={activeTab}
                onTabClick={(tab) => onTabChange(tab.value as AdminTabType)}
                multiselect={false}
            />
        </HStack>
    );
};
