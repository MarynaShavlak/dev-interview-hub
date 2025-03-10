import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionCellsList } from './ActionCellsList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/ActionCellsList',
    component: ActionCellsList,
    argTypes: {
        editRow: { action: 'editRow clicked' },
        deleteRow: { action: 'deleteRow clicked' },
    },
} as ComponentMeta<typeof ActionCellsList>;

const Template: ComponentStory<typeof ActionCellsList> = (args) => (
    <ActionCellsList {...args} />
);

const defaultArgs = {
    editRow: (id: string) => console.log(`Edit row: ${id}`),
    deleteRow: (id: string) => console.log(`Delete row: ${id}`),
};
const deleteOnlyArgs = {
    deleteRow: (id: string) => console.log(`Delete row: ${id}`),
    editRow: undefined,
};
const editOnlyArgs = {
    deleteRow: undefined,
    editRow: (id: string) => console.log(`Edit row: ${id}`),
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = defaultArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const DeleteOnly = Template.bind({});
DeleteOnly.args = deleteOnlyArgs;

export const DeleteOnlyRedesigned = Template.bind({});
DeleteOnlyRedesigned.args = deleteOnlyArgs;
DeleteOnlyRedesigned.decorators = [NewDesignDecorator];

export const EditOnly = Template.bind({});
EditOnly.args = editOnlyArgs;

export const EditOnlyRedesigned = Template.bind({});
EditOnlyRedesigned.args = editOnlyArgs;
EditOnlyRedesigned.decorators = [NewDesignDecorator];
