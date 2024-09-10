import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Rating } from './Rating';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Rating/Rating',
    component: Rating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const WithPreSelectedRating = Template.bind({});
WithPreSelectedRating.args = {
    rate: 3,
};

export const WithFeedback = Template.bind({});
WithFeedback.args = {
    title: 'Оцініть статтю',
    feedbackTitle:
        'Залишіть свій відгук про статтю, це допоможе покращити якість',
    hasFeedback: true,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

export const WithPreSelectedRatingRedesigned = Template.bind({});
WithPreSelectedRatingRedesigned.args = {
    rate: 3,
};
WithPreSelectedRatingRedesigned.decorators = [NewDesignDecorator];
export const WithFeedbackRedesigned = Template.bind({});
WithFeedbackRedesigned.args = {
    title: 'Оцініть статтю',
    feedbackTitle:
        'Залишіть свій відгук про статтю, це допоможе покращити якість',
    hasFeedback: true,
};
WithFeedbackRedesigned.decorators = [NewDesignDecorator];
