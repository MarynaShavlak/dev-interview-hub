import React, { useCallback } from 'react';
import { UsersFullInfoTable } from '@/widgets/UsersFullInfoTable';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleReducer } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { deleteUserThunk } from '@/entities/User';

const reducers: ReducersList = {
    articles: articleReducer,
};

const AdminPanelPage = () => {
    const dispatch = useAppDispatch();

    const handleDeleteUser = useCallback(
        async (userId: string) => {
            try {
                const deletedUserId = await dispatch(
                    deleteUserThunk(userId),
                ).unwrap();
                await searchClient.clearCache();
                return deletedUserId;
            } catch (error) {
                console.error('Error deleting user:', error);
                return null;
            }
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <main data-testid="AdminPanelPage">
                        {/* <StatisticsCharts /> */}

                        <UsersFullInfoTable onDeleteUser={handleDeleteUser} />

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
