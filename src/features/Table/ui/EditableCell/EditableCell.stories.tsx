import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableCell } from './EditableCell';
import { rowMock, columnMock } from '../../testing';
import { TableMetaCustom } from '../..';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const defaultArgs = {
    row: rowMock,
    column: columnMock,
    getValue: () => 'Initial Value', // Example initial value
    table: {
        options: {
            meta: {
                updateData: (
                    rowIndex: number,
                    columnId: string,
                    newValue: string,
                ) =>
                    console.log(
                        `Updated row ${rowIndex} column ${columnId} to ${newValue}`,
                    ),
            } as TableMetaCustom<any>,
        },
    },
};

export default {
    title: 'features/Table/EditableCell',
    component: EditableCell,
} as ComponentMeta<typeof EditableCell>;

const Template: ComponentStory<typeof EditableCell> = (args) => (
    <EditableCell {...args} />
);

export const DefaultView = Template.bind({});

// @ts-ignore
DefaultView.args = { ...defaultArgs };

export const DefaultViewRedesigned = Template.bind({});
// @ts-ignore
DefaultViewRedesigned.args = { ...defaultArgs };
DefaultViewRedesigned.decorators = [NewDesignDecorator];
