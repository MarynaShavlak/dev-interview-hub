import React, { useState } from 'react';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UsersFullInfoTable } from '@/widgets/UsersFullInfoTable';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { AdminTabsNavigation } from '../AdminTabsNavigation/AdminTabsNavigation';

type AdminTabType = 'charts' | 'table';

export const AdminPanelPageContent = () => {
    const [activeTab, setActiveTab] = useState<AdminTabType>('charts');
    const mainWrapperClasses = getFlexClasses({ vStack: true, gap: '24' });

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main
                    data-testid="AdminPanelPage"
                    className={classNames('', {}, mainWrapperClasses)}
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
                </main>
            }
            off={
                <Page data-testid="AdminPanelPage">
                    <StatisticsCharts />
                </Page>
            }
        />
    );
};
