import React from 'react';
import { UsersFullInfoTable } from '@/widgets/UsersFullInfoTable';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleReducer } from '@/entities/Article';

const reducers: ReducersList = {
    articles: articleReducer,
};

const AdminPanelPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <main data-testid="AdminPanelPage">
                        {/* <StatisticsCharts /> */}

                        <UsersFullInfoTable />

                        {/* <UsersInfoTable /> */}
                    </main>
                }
                off={
                    <Page data-testid="AdminPanelPage">
                        <StatisticsCharts />
                        {/* <UsersInfoTable /> */}
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default AdminPanelPage;
