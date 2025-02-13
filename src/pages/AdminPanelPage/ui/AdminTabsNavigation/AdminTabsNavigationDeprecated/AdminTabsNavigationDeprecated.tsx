import React, { memo, useMemo } from 'react';

import cls from '../AdminTabsNavigation.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { AdminTabsNavigationProps } from '../AdminTabsNavigation';
import { useAdminTabs } from '../../../lib/hook/useAdminTabs/useAdminTabs';
import { AdminTabType } from '../../../model/types/adminTabTypes';
import { Tabs } from '@/shared/ui/deprecated/Tabs';

export const AdminTabsNavigationDeprecated = memo(
    ({ activeTab, onTabChange }: AdminTabsNavigationProps) => {
        const rawAdminTabs = useAdminTabs();
        const adminTabs = useMemo(() => rawAdminTabs, [rawAdminTabs]);
        return (
            <HStack justify="between" max className={cls.tabsWrapDeprecated}>
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
