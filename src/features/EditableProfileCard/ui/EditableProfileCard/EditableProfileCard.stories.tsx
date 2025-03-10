import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCard } from './EditableProfileCard';
// import { testProfileData } from '@/entities/Profile/testing';
import { testUserData } from '@/entities/User/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ValidateProfileError } from '../../model/consts/consts';

export default {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
    <EditableProfileCard {...args} />
);

const errorProfileData = {
    form: { ...testUserData, lastname: '', username: '' },
    readonly: false,
    validateErrors: [
        ValidateProfileError.INCORRECT_USER_DATA,
        ValidateProfileError.INCORRECT_USERNAME,
    ],
};
export const IsEdited = Template.bind({});
IsEdited.args = {};

IsEdited.decorators = [
    StoreDecorator({
        profile: { form: testUserData, readonly: false },
    }),
];

export const IsEditedRedesigned = Template.bind({});
IsEditedRedesigned.args = {};

IsEditedRedesigned.decorators = [
    StoreDecorator({
        profile: { form: testUserData, readonly: false },
    }),
    NewDesignDecorator,
];

export const NotEdited = Template.bind({});
NotEdited.args = {};

NotEdited.decorators = [
    StoreDecorator({
        profile: { form: testUserData, readonly: true },
    }),
];

export const NotEditedRedesigned = Template.bind({});
NotEditedRedesigned.args = {};

NotEditedRedesigned.decorators = [
    StoreDecorator({
        profile: { form: testUserData, readonly: true },
    }),
    NewDesignDecorator,
];

export const WithValidationErrors = Template.bind({});
WithValidationErrors.args = {};

WithValidationErrors.decorators = [
    StoreDecorator({ profile: errorProfileData }),
];

export const WithValidationErrorsRedesigned = Template.bind({});
WithValidationErrorsRedesigned.args = {};
WithValidationErrorsRedesigned.decorators = [
    StoreDecorator({ profile: errorProfileData }),
    NewDesignDecorator,
];
