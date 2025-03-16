import React from 'react';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleReducer } from '@/entities/Article';
import { AdminPanelPageContent } from './AdminPanelPageContent/AdminPanelPageContent';

const reducers: ReducersList = {
    articles: articleReducer,
};

const AdminPanelPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <AdminPanelPageContent data-testid="AdminPanelPage" />
        </DynamicModuleLoader>
    );
};

export default AdminPanelPage;
