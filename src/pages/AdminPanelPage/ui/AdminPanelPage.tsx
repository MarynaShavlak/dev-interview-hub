import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Table } from '@/shared/ui/redesigned/Table/Table';

interface User {
    id: number;
    name: string;
    email: string;
}

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    const data: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' as keyof User },
        { Header: 'Name', accessor: 'name' as keyof User },
        { Header: 'Email', accessor: 'email' as keyof User },
    ];

    return (
        <Page data-testid="AdminPanelPage">
            {t('Адмін панель')}
            <Table data={data} columns={columns} />
        </Page>
    );
};

export default AdminPanelPage;
