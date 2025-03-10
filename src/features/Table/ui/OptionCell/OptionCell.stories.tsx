import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OptionCell } from './OptionCell';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ColorOption } from '../../model/types/tableTypes';

const rowMock = {
    original: { id: '1' },
};
const columnMock = { id: 'status' };
const colorOptions: ColorOption[] = [
    { id: '1', name: 'red', color: '#ff0000' },
    { id: '2', name: 'green', color: '#00ff00' },
    { id: '3', name: 'blue', color: '#0000ff' },
];

const defaultArgs = {
    row: rowMock,
    column: columnMock,
    getValue: () => colorOptions[0], // Example: 'red'
    options: colorOptions,
    isEditRoleMode: false,
    updateRow: (id: string, columnId: string, newValue: any) =>
        console.log(`Updated row ${id} column ${columnId} to ${newValue}`),
};

export default {
    title: 'features/Table/OptionCell',
    component: OptionCell,
} as ComponentMeta<typeof OptionCell>;

const Template: ComponentStory<typeof OptionCell> = (args) => (
    <OptionCell {...args} />
);

export const AdminView = Template.bind({});
// @ts-ignore
AdminView.args = { ...defaultArgs, isEditRoleMode: false };
AdminView.decorators = [StoreDecorator({})];
