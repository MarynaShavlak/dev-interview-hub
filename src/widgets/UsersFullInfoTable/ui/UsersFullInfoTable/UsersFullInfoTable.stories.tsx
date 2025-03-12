import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { UsersFullInfoTable } from './UsersFullInfoTable';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { LoadingTableSkeleton } from '../LoadingTableSkeleton/LoadingTableSkeleton';
import { EmptyTableState } from '@/features/Table';

export default {
    title: 'widgets/UsersFullInfoTable',
    component: UsersFullInfoTable,
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
} as ComponentMeta<typeof UsersFullInfoTable>;

const Template: ComponentStory<typeof UsersFullInfoTable> = (args) => (
    <UsersFullInfoTable />
);

export const Default = Template.bind({});
Default.args = {};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
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
    () => <EmptyTableState message="Не зареєстровано жодного користувача" />,
];

export const EmptyStateRedesigned = Template.bind({});
EmptyStateRedesigned.decorators = [
    () => <EmptyTableState message="Не зареєстровано жодного користувача" />,
];
