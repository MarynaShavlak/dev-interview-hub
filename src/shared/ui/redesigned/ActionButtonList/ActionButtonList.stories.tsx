import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionButtonList } from './ActionButtonList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/ActionButtonList',
    component: ActionButtonList,
    argTypes: {
        successAction: { control: 'object' },
        cancelAction: { control: 'object' },
        className: { control: 'text' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof ActionButtonList>;

const Template: ComponentStory<typeof ActionButtonList> = (args) => (
    <ActionButtonList {...args} />
);

export const Default = Template.bind({});
Default.args = {
    successAction: {
        label: 'Save',
        onClick: () => console.log('Save clicked'),
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel clicked'),
    },
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    successAction: {
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        icon: () => (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0z" />
            </svg>
        ),
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel clicked'),
        icon: () => (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2l12 12M14 2L2 14" />
            </svg>
        ),
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    successAction: {
        label: 'Save',
        onClick: () => console.log('Save clicked'),
        disabled: true,
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel clicked'),
        disabled: true,
    },
};
