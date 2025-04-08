import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { AddNewArticleButton } from '@/shared/ui/common/AddNewArticleButton';
import { UserArticlesTable } from './UserArticlesTable';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { EmptyTableState } from '@/features/Table';

export default {
    title: 'widgets/UserArticlesTable',
    component: UserArticlesTable,
    argTypes: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    roles: [UserRole.ADMIN],
                    id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
                },
            },
        }),
    ],
} as ComponentMeta<typeof UserArticlesTable>;

const Template: ComponentStory<typeof UserArticlesTable> = (args) => (
    <UserArticlesTable {...args} />
);

const mockDeleteArticle = async (articleId: string): Promise<string | null> => {
    console.log(`Deleted article with ID: ${articleId}`);
    return articleId;
};

export const Default = Template.bind({});
Default.args = {
    onDeleteArticle: mockDeleteArticle,
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    onDeleteArticle: mockDeleteArticle,
};
DefaultRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.decorators = [() => <LoadingTableSkeleton />];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [
    () => <LoadingTableSkeleton />,
    NewDesignDecorator,
];

export const EmptyState = Template.bind({});
EmptyState.decorators = [
    () => (
        <EmptyTableState message="Не створено жодної статті">
            <AddNewArticleButton />
        </EmptyTableState>
    ),
];

export const EmptyStateRedesigned = Template.bind({});
EmptyStateRedesigned.decorators = [
    () => (
        <EmptyTableState message="Не створено жодної статті">
            <AddNewArticleButton />
        </EmptyTableState>
    ),
];
