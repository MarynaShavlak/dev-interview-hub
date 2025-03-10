import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ColorIndicatorOptionItem } from './ColorIndicatorOptionItem';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Table/ColorIndicatorOptionItem',
    component: ColorIndicatorOptionItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ColorIndicatorOptionItem>;

const Template: ComponentStory<typeof ColorIndicatorOptionItem> = (args) => (
    <ColorIndicatorOptionItem {...args} />
);

const defaultArgs = {
    option: {
        id: '1',
        name: 'red',
        color: '#ff0000',
    },
    onClick: (event: React.MouseEvent<HTMLDivElement>) =>
        console.log('Color clicked:', event),
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = defaultArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];
