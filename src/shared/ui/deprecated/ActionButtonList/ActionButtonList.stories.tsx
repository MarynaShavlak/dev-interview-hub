import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ActionButtonList } from './ActionButtonList';

export default {
    title: 'shared/deprecated/ActionButtonList',
    component: ActionButtonList,
    argTypes: {
        successAction: { control: 'object' },
        cancelAction: { control: 'object' },
        className: { control: 'text' },
    },
} as ComponentMeta<typeof ActionButtonList>;

const Template: ComponentStory<typeof ActionButtonList> = (args) => (
    <ActionButtonList {...args} />
);

export const Default = Template.bind({});
Default.args = {
    successAction: {
        label: 'Confirm',
        onClick: () => console.log('Success action triggered'),
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel action triggered'),
    },
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    successAction: {
        label: 'Confirm',
        onClick: () => console.log('Success action triggered'),
        icon: () => (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="8" />
            </svg>
        ),
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel action triggered'),
        icon: () => (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" />
            </svg>
        ),
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    successAction: {
        label: 'Confirm',
        onClick: () => console.log('Success action triggered'),
        disabled: true,
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel action triggered'),
        disabled: true,
    },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    successAction: {
        label: 'Confirm',
        onClick: () => console.log('Success action triggered'),
        icon: () => (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="8" />
            </svg>
        ),
    },
    cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancel action triggered'),
    },
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
