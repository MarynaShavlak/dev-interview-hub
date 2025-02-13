import React, { memo, useMemo } from 'react';

import { Tabs } from '@/shared/ui/redesigned/Tabs';
import cls from '../AdminTabsNavigation.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { AdminTabsNavigationProps } from '../AdminTabsNavigation';
import { useAdminTabs } from '../../../lib/hook/useAdminTabs/useAdminTabs';
import { AdminTabType } from '../../../model/types/adminTabTypes';

export const AdminTabsNavigationRedesigned = memo(
    ({ activeTab, onTabChange }: AdminTabsNavigationProps) => {
        const rawAdminTabs = useAdminTabs();
        const adminTabs = useMemo(() => rawAdminTabs, [rawAdminTabs]);
        return (
            <HStack justify="between" max className={cls.tabsWrapRedesigned}>
                <Tabs
                    tabs={adminTabs}
                    value={activeTab}
                    onTabClick={(tab) => onTabChange(tab.value as AdminTabType)}
                    multiselect={false}
                />
            </HStack>
        );
    },
);
