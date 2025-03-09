import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RecoverPasswordForm } from './RecoverPasswordForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// Storybook Metadata
export default {
    title: 'features/Auth/RecoverPasswordForm',
    component: RecoverPasswordForm,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof RecoverPasswordForm>;

const Template: ComponentStory<typeof RecoverPasswordForm> = (args) => {
    return <RecoverPasswordForm {...args} />;
};

const normalArgs = {
    toggleForm: () => console.log('Redirect to login form'),
};

// Default Story
export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

// // Story for Invalid Email Input
// export const InvalidEmail = Template.bind({});
// InvalidEmail.args = {
//     toggleForm: () => console.log('Redirect to login form'),
// };
// InvalidEmail.parameters = {
//     docs: {
//         description: {
//             story: 'Shows an error when an invalid email is entered.',
//         },
//     },
// };
//
// // Story for Email Sent Success State
// export const EmailSentSuccess = Template.bind({});
// EmailSentSuccess.args = {
//     toggleForm: () => console.log('Redirect to login form'),
// };
// EmailSentSuccess.parameters = {
//     docs: {
//         description: {
//             story: 'Displays a confirmation message after the email is successfully sent.',
//         },
//     },
// };
//
// // Story for API Error State
// export const ErrorState = Template.bind({});
// ErrorState.args = {
//     toggleForm: () => console.log('Redirect to login form'),
// };
// ErrorState.parameters = {
//     docs: {
//         description: {
//             story: 'Displays an error message if password recovery fails.',
//         },
//     },
// };
//
// // Story for Loading State
// export const LoadingState = Template.bind({});
// LoadingState.args = {
//     toggleForm: () => console.log('Redirect to login form'),
// };
// LoadingState.parameters = {
//     docs: {
//         description: {
//             story: 'Disables the button and shows a loading state while waiting for the API response.',
//         },
//     },
// };
