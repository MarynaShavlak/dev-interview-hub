import React from 'react';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { UsersInfoTable } from '@/features/UsersInfoTable';

const AdminPanelPage = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main data-testid="AdminPanelPage">
                    <StatisticsCharts />
                    <UsersInfoTable />
                </main>
            }
            off={
                <Page data-testid="AdminPanelPage">
                    <StatisticsCharts />
                    {/* <UsersInfoTable /> */}
                </Page>
            }
        />
    );
};

export default AdminPanelPage;
