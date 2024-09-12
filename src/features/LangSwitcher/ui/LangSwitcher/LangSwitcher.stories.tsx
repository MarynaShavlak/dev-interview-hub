import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LangSwitcher } from './LangSwitcher';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';

export default {
    title: 'features/LangSwitcher',
    component: LangSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withI18nDecorator],
} as ComponentMeta<typeof LangSwitcher>;

const Template: ComponentStory<typeof LangSwitcher> = (args) => (
    <LangSwitcher {...args} />
);

export const LongLabel = Template.bind({});
LongLabel.args = {};

export const ShortLabel = Template.bind({});
ShortLabel.args = {
    short: true,
};

export const LongLabelRedesigned = Template.bind({});
LongLabelRedesigned.args = {};
LongLabelRedesigned.decorators = [NewDesignDecorator];

export const ShortLabelRedesigned = Template.bind({});
ShortLabelRedesigned.args = {
    short: true,
};
ShortLabelRedesigned.decorators = [NewDesignDecorator];
