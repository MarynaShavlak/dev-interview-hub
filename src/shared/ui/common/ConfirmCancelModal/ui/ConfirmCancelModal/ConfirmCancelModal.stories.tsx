import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ConfirmCancelModal } from './ConfirmCancelModal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

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
    decorators: [withI18nDecorator],
} as ComponentMeta<typeof ConfirmCancelModal>;

const Template: ComponentStory<typeof ConfirmCancelModal> = (args) => (
    <ConfirmCancelModal {...args} />
);
const arg = {
    isOpen: true,
    onCancel: action('Cancelled'),
    onConfirm: action('Confirmed'),
    text: 'редагування цієї статті',
    cancelBtnText: 'Продовжити редагування',
    confirmBtnText: 'Відмінити зміни',
};

export const Default = Template.bind({});
Default.args = arg;

export const DarkTheme = Template.bind({});
DarkTheme.args = arg;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = arg;

DefaultRedesigned.decorators = [NewDesignDecorator];
