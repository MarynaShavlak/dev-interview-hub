import React, { memo, useMemo } from 'react';

import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import cls from '../MyArticlesTabsNavigation.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { MyArticlesTabsNavigationProps } from '../MyArticlesTabsNavigation';
import { useMyArticlesTabs } from '../../../lib/hook/useMyArticlesTabs/useMyArticlesTabs';
import { MyArticlesTabType } from '../../../model/types/myArticlesTabTypes';
import { Tabs } from '@/shared/ui/deprecated/Tabs';

export const MyArticlesTabsNavigationDeprecated = memo(
    ({ activeTab, onTabChange }: MyArticlesTabsNavigationProps) => {
        const rawTabs = useMyArticlesTabs();
        const tabs = useMemo(() => rawTabs, [rawTabs]);
        return (
            <HStack justify="between" max className={cls.tabsWrapDeprecated}>
                <Tabs
                    tabs={tabs}
                    value={activeTab}
                    onTabClick={(tab) =>
                        onTabChange(tab.value as MyArticlesTabType)
                    }
                    multiselect={false}
                />
                <AddNewEntityButton entityType="article" />
            </HStack>
        );
    },
);
