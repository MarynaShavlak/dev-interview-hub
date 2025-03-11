import { Meta, StoryObj } from '@storybook/react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { TablePagination } from './TablePagination';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const createData = (count: number) => {
    return Array(count)
        .fill(0)
        .map((_, index) => ({
            id: index + 1,
            name: `Item ${index + 1}`,
            description: `Description for item ${index + 1}`,
        }));
};

const meta = {
    title: 'features/Table/TablePagination',
    component: TablePagination,
} satisfies Meta<typeof TablePagination>;

export default meta;

type Story = StoryObj<typeof meta>;

interface TablePaginationStoryProps {
    data?: { id: number; name: string; description: string }[];
    pageSize?: number;
    initialPage?: number;
    className?: string;
}

const TablePaginationStory = ({
    data = createData(50),
    pageSize = 10,
    initialPage = 0,
    className = '',
}: TablePaginationStoryProps) => {
    const [pagination, setPagination] = useState({
        pageIndex: initialPage,
        pageSize,
    });

    const table = useReactTable({
        data,
        columns: [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Description',
                accessorKey: 'description',
            },
        ],
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return <TablePagination table={table} className={className} />;
};

export const Default: Story = {
    render: () => <TablePaginationStory />,
};

export const DefaultRedesigned: Story = {
    render: () => <TablePaginationStory />,
};
DefaultRedesigned.decorators = [NewDesignDecorator];

export const LargeDataset: Story = {
    render: () => <TablePaginationStory data={createData(100)} pageSize={10} />,
};

export const StartFromMiddlePage: Story = {
    render: () => <TablePaginationStory initialPage={2} />,
};

export const LastPage: Story = {
    render: () => (
        <TablePaginationStory
            data={createData(30)}
            pageSize={10}
            initialPage={2}
        />
    ),
};

export const FirstPage: Story = {
    render: () => <TablePaginationStory initialPage={0} />,
};

export const ExactlyOnePage: Story = {
    render: () => <TablePaginationStory data={createData(10)} pageSize={10} />,
};

export const EmptyDataset: Story = {
    render: () => <TablePaginationStory data={[]} />,
};
