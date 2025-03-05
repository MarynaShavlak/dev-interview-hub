import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OrderCard } from './OrderCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/OrderCard',
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
    decorators: [NewDesignDecorator],
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
