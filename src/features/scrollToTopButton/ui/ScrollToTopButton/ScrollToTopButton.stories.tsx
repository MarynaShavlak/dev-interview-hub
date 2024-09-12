import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ScrollToTopButton',
    component: ScrollToTopButton,
    decorators: [StoreDecorator({})],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ScrollToTopButton>;

const Template: ComponentStory<typeof ScrollToTopButton> = (args) => (
    <ScrollToTopButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
