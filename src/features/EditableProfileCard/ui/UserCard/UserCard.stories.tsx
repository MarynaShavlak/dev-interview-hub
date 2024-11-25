import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserCard } from './UserCard';
import { testProfileData } from '../../../../entities/Profile/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Profile/UserCard',
    component: UserCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UserCard>;

const Template: ComponentStory<typeof UserCard> = (args) => (
    <UserCard {...args} />
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

export const Readonly = Template.bind({});
Readonly.args = { ...primaryArgs, readonly: true };

export const Editable = Template.bind({});
Editable.args = { ...primaryArgs, readonly: false };

export const withError = Template.bind({});
withError.args = errorArgs;
export const Loading = Template.bind({});
Loading.args = loadingArgs;

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = { ...primaryArgs, readonly: true };
ReadonlyRedesigned.decorators = [NewDesignDecorator];

export const EditableRedesigned = Template.bind({});
EditableRedesigned.args = { ...primaryArgs, readonly: false };
EditableRedesigned.decorators = [NewDesignDecorator];

export const withErrorRedesigned = Template.bind({});
withErrorRedesigned.args = errorArgs;
withErrorRedesigned.decorators = [NewDesignDecorator];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = loadingArgs;
LoadingRedesigned.decorators = [NewDesignDecorator];
