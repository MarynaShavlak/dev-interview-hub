import React from 'react';
import { Page } from '@/widgets/Page';
import { UsersInfoTable } from '@/features/UsersInfoTable';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleQuarterlyDataCharts } from '@/features/ArticleQuarterlyDataCharts';
import { ArticleCommentsCharts } from '@/features/ArticleCommentsCharts';
import { ArticleCategoriesCharts } from '@/features/ArticleCategoriesCharts';
import { ArticleRatingsCharts } from '@/features/ArticleRatingsCharts';

const AdminPanelPage = () => {
    return (
        <Page data-testid="AdminPanelPage">
            <VStack gap="24">
                <ArticleCategoriesCharts />
                <ArticleQuarterlyDataCharts />
                <ArticleCommentsCharts />
                <ArticleRatingsCharts />
                <UsersInfoTable />
            </VStack>
        </Page>
    );
};

export default AdminPanelPage;
