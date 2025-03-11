import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { EmptyTableState } from './EmptyTableState';

export default {
    title: 'features/Table/EmptyTableState',
    component: EmptyTableState,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withI18nDecorator],
} as ComponentMeta<typeof EmptyTableState>;

const Template: ComponentStory<typeof EmptyTableState> = (args) => (
    <EmptyTableState {...args} />
);

export const Default = Template.bind({});
Default.args = {
    message: 'Не створено жодної статті',
};

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
    message: 'Не створено жодної статті',
};
DefaultRedesigned.decorators = [NewDesignDecorator];
