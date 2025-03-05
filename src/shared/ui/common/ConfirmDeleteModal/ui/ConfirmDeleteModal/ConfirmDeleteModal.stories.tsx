import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/ConfirmDeleteModal',
    component: ConfirmDeleteModal,
    argTypes: {
        text: { control: 'text' },

        isOpen: { control: 'boolean' },
    },
    decorators: [withI18nDecorator],
} as ComponentMeta<typeof ConfirmDeleteModal>;

const Template: ComponentStory<typeof ConfirmDeleteModal> = (args) => (
    <ConfirmDeleteModal {...args} />
);
const arg = {
    isOpen: true,
    onCancel: () => console.log('Cancel clicked'),
    onConfirm: async () => {
        console.log('Confirm clicked');
        return Promise.resolve();
    },
    text: 'цю статтю',
};

export const Default = Template.bind({});
Default.args = arg;

export const DarkTheme = Template.bind({});
DarkTheme.args = arg;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = arg;

DefaultRedesigned.decorators = [NewDesignDecorator];
