import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { UsersInfoTable } from '@/features/UsersInfoTable';
import { ArticleCategoriesChart } from '@/features/ArticleCategoriesChart';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleQuarterlyDataCharts } from '@/features/ArticleQuarterlyDataCharts';

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    return (
        <Page data-testid="AdminPanelPage">
            <VStack gap="24">
                <ArticleCategoriesChart />
                <ArticleQuarterlyDataCharts />
                <UsersInfoTable />
            </VStack>
        </Page>
    );
};

export default AdminPanelPage;
