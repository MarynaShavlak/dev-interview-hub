import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs'; // Update path if necessary

export default {
    title: 'shared/deprecated/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
        direction: {
            control: { type: 'radio', options: ['row', 'column'] },
        },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        { value: 'tab1', content: 'Tab 1' },
        { value: 'tab2', content: 'Tab 2' },
        { value: 'tab3', content: 'Tab 3' },
    ],
    value: 'tab2',
    onTabClick: action('onTabClick'),
};

export const VerticalDirection = Template.bind({});
VerticalDirection.args = {
    tabs: [
        { value: 'tab1', content: 'Tab 1' },
        { value: 'tab2', content: 'Tab 2' },
        { value: 'tab3', content: 'Tab 3' },
    ],
    value: 'tab1',
    direction: 'column',
    onTabClick: action('onTabClick'),
};

export const ExtraTabs = Template.bind({});
ExtraTabs.args = {
    tabs: [
        { value: 'tab1', content: 'Tab 1' },
        { value: 'tab2', content: 'Tab 2' },
        { value: 'tab3', content: 'Tab 3' },
        { value: 'tab4', content: 'Tab 4' },
        { value: 'tab5', content: 'Tab 5' },
        { value: 'tab6', content: 'Tab 6' },
        { value: 'tab7', content: 'Tab 7' },
    ],
    value: 'tab4',
};
