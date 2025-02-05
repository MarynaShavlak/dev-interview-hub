export {};
// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import { EditableProfileCard } from './EditableProfileCard';
// import { testProfileData } from '@/entities/Profile/testing';
// import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
// import { ValidateProfileError } from '../../model/consts/consts';
//
// export default {
//     title: 'features/EditableProfileCard',
//     component: EditableProfileCard,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof EditableProfileCard>;
//
// const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
//     <EditableProfileCard {...args} />
// );
//
// export const IsEdited = Template.bind({});
// IsEdited.args = {};
//
// IsEdited.decorators = [
//     StoreDecorator({
//         profile: { form: testProfileData, readonly: false },
//     }),
// ];
//
// export const WithValidationErrors = Template.bind({});
// WithValidationErrors.args = {};
//
// WithValidationErrors.decorators = [
//     StoreDecorator({
//         profile: {
//             form: { ...testProfileData, lastname: '', username: '' },
//             readonly: false,
//             validateErrors: [
//                 ValidateProfileError.INCORRECT_USER_DATA,
//                 ValidateProfileError.INCORRECT_USERNAME,
//             ],
//         },
//     }),
// ];
//
// export const NotEdited = Template.bind({});
// NotEdited.args = {};
//
// NotEdited.decorators = [
//     StoreDecorator({
//         profile: { form: testProfileData, readonly: true },
//     }),
// ];
//
// export const IsEditedRedesigned = Template.bind({});
// IsEditedRedesigned.args = {};
//
// IsEditedRedesigned.decorators = [
//     StoreDecorator({
//         profile: { form: testProfileData, readonly: false },
//     }),
//     NewDesignDecorator,
// ];
//
// export const NotEditedRedesigned = Template.bind({});
// NotEditedRedesigned.args = {};
//
// NotEditedRedesigned.decorators = [
//     StoreDecorator({
//         profile: { form: testProfileData, readonly: true },
//     }),
//     NewDesignDecorator,
// ];
//
// export const WithValidationErrorsRedesigned = Template.bind({});
// WithValidationErrorsRedesigned.args = {};
// WithValidationErrorsRedesigned.decorators = [
//     StoreDecorator({
//         profile: {
//             form: { ...testProfileData, lastname: '', username: '' },
//             readonly: false,
//             validateErrors: [
//                 ValidateProfileError.INCORRECT_USER_DATA,
//                 ValidateProfileError.INCORRECT_USERNAME,
//             ],
//         },
//     }),
//     NewDesignDecorator,
// ];
