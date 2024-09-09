import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/StarRating/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
    <StarRating {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const WithTwoSelectedStars = Template.bind({});
WithTwoSelectedStars.args = { selectedStars: 2 };

export const WithFewSelectedStarsRedesigned = Template.bind({});
WithFewSelectedStarsRedesigned.args = { selectedStars: 4 };
WithFewSelectedStarsRedesigned.decorators = [NewDesignDecorator];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator];

export const DisabledStarRating = Template.bind({});
DisabledStarRating.args = { disabled: true };

export const DisabledStarRatingRedesigned = Template.bind({});
DisabledStarRatingRedesigned.args = { disabled: true };
DisabledStarRatingRedesigned.decorators = [NewDesignDecorator];
