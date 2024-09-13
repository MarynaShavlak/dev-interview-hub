import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { SettingsPageSkeleton } from './SettingsPageSkeleton';

export default {
    title: 'pages/SettingsPage/SettingsPageSkeleton',
    component: SettingsPageSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof SettingsPageSkeleton>;

const Template: ComponentStory<typeof SettingsPageSkeleton> = () => (
    <SettingsPageSkeleton />
);

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];
