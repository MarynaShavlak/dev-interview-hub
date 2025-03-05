import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OrderCard } from './OrderCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/deprecated/OrderCard',
    component: OrderCard,
    argTypes: {
        index: { control: 'number' },
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
} as ComponentMeta<typeof OrderCard>;

const Template: ComponentStory<typeof OrderCard> = (args) => (
    <OrderCard {...args} />
);

export const DefaultOrderCard = Template.bind({});
DefaultOrderCard.args = {
    index: 1,
};

export const OrderCardWithFourDigitIndex = Template.bind({});
OrderCardWithFourDigitIndex.args = {
    index: 2000,
};

export const OrderCardWithLargeIndex = Template.bind({});
OrderCardWithLargeIndex.args = {
    index: 100000,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    index: 1,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
