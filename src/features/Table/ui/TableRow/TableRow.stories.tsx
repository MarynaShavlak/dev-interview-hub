import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from './TableRow';
import { createMockRow, mockPersons } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
    title: 'features/Table/TableRow',
    component: TableRow,
    parameters: {
        layout: 'centered',
    },

    decorators: [
        (Story) => (
            <div style={{ width: '100%', maxWidth: '800px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = { row: createMockRow(mockPersons[0]) };
// @ts-ignore
export const Default: Story = { args: defaultArgs };

// @ts-ignore
export const DefaultRedesigned: Story = { args: defaultArgs };
DefaultRedesigned.decorators = [NewDesignDecorator];
