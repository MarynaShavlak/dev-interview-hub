import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { testProfileData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const primaryArgs = {
    data: testProfileData,
};

const errorArgs = {
    error: 'Some error occurred',
};

const loadingArgs = {
    isLoading: true,
};

export const Normal = Template.bind({});
Normal.args = primaryArgs;
export const withError = Template.bind({});
withError.args = errorArgs;
export const Loading = Template.bind({});
Loading.args = loadingArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = primaryArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const withErrorRedesigned = Template.bind({});
withErrorRedesigned.args = errorArgs;
withErrorRedesigned.decorators = [NewDesignDecorator];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = loadingArgs;
LoadingRedesigned.decorators = [NewDesignDecorator];
