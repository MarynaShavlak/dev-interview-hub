import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LinkCell } from './LinkCell';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/LinkCell',
    component: LinkCell,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LinkCell>;

const Template: ComponentStory<typeof LinkCell> = (args) => (
    <LinkCell {...args} />
);

const navigateMock = (id: string) => console.log('Navigating to:', id);
const defaultArgs = {
    value: 'Link cell',
    navigateFn: navigateMock,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = { ...defaultArgs };
Redesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
