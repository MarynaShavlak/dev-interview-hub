import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OptionCell } from './OptionCell';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { colorOptions, columnMock, rowMock } from '../../testing';

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
