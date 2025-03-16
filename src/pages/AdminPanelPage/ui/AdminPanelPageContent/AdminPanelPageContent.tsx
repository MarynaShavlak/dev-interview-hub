import React from 'react';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UsersFullInfoTable } from '@/widgets/UsersFullInfoTable';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AdminTabsNavigation } from '../AdminTabsNavigation/AdminTabsNavigation';
import { ADMIN_TAB_KEY } from '@/shared/const/localstorage';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage/useLocalStorage';

type AdminTabType = 'charts' | 'table';

export const AdminPanelPageContent = () => {
    const [activeTab, setActiveTab] = useLocalStorage<AdminTabType>(
        ADMIN_TAB_KEY,
        'charts',
    );

    const mainWrapperClasses = getFlexClasses({ vStack: true, gap: '24' });

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main className={classNames('', {}, mainWrapperClasses)}>
                    <AdminTabsNavigation
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {activeTab === 'charts' ? (
                        <StatisticsCharts />
                    ) : (
                        <UsersFullInfoTable />
                    )}
                </main>
            }
            off={
                <Page
                    className={classNames('', {}, mainWrapperClasses)}
                    data-testid="AdminPanelPage"
                >
                    <AdminTabsNavigation
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {activeTab === 'charts' ? (
                        <StatisticsCharts />
                    ) : (
                        <UsersFullInfoTable />
                    )}
                </Page>
            }
        />
    );
};
