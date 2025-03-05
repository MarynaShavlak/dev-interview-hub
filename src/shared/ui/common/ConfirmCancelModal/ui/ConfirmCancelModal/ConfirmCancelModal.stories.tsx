import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ConfirmCancelModal } from './ConfirmCancelModal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/common/ConfirmCancelModal',
    component: ConfirmCancelModal,
    argTypes: {
        onCancel: { action: 'onCancel' },
        onConfirm: { action: 'onConfirm' },
        text: { control: 'text' },
        cancelBtnText: { control: 'text' },
        confirmBtnText: { control: 'text' },
        isOpen: { control: 'boolean' },
    },
} as ComponentMeta<typeof ConfirmCancelModal>;

const Template: ComponentStory<typeof ConfirmCancelModal> = (args) => (
    <ConfirmCancelModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    onCancel: action('Cancelled'),
    onConfirm: action('Confirmed'),
    text: 'редагування цієї статті',
    cancelBtnText: 'Продовжити редагування',
    confirmBtnText: 'Відмінити зміни',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    isOpen: true,
    onCancel: action('Cancelled'),
    onConfirm: action('Confirmed'),
    text: 'редагування цієї статті',
    cancelBtnText: 'Продовжити редагування',
    confirmBtnText: 'Відмінити зміни',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
