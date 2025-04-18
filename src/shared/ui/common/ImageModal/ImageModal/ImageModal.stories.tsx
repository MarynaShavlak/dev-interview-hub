import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageModal } from './ImageModal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/ImageModal',
    component: ImageModal,
    argTypes: {
        isOpen: { control: 'boolean' },
        src: { control: 'text' },
        title: { control: 'text' },
    },
    decorators: [withI18nDecorator],
} as ComponentMeta<typeof ImageModal>;

const Template: ComponentStory<typeof ImageModal> = (args) => (
    <ImageModal {...args} />
);

const baseArgs = {
    isOpen: true,
    src: 'https://firebasestorage.googleapis.com/v0/b/dev-interview-hub.firebasestorage.app/o/images%2Farticles%2FScreenshot_77.jpg_21435906-6eff-41a3-a5e0-3343d52fa09f?alt=media&token=c4590bdb-e5f5-4d03-8400-2491f8166240',
    title: 'Image Preview',
};

export const Default = Template.bind({});
Default.args = baseArgs;

export const DarkTheme = Template.bind({});
DarkTheme.args = baseArgs;
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = baseArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];
