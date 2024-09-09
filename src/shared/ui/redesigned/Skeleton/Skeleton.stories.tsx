import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
    <Skeleton {...args} />
);

export const DefaultSkeleton = Template.bind({});
DefaultSkeleton.args = {
    width: 100,
    height: 100,
};

export const CustomSizeSkeleton = Template.bind({});
CustomSizeSkeleton.args = {
    width: 200,
    height: 50,
};

export const CircularSkeleton = Template.bind({});
CircularSkeleton.args = {
    width: 100,
    height: 100,
    border: '50%',
};

export const RoundedSkeleton = Template.bind({});
RoundedSkeleton.args = {
    width: 150,
    height: 100,
    border: '10px',
};

export const FullWidthSkeleton = Template.bind({});
FullWidthSkeleton.args = {
    width: '100%',
    height: 20,
};
