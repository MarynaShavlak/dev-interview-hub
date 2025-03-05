import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ValidationErrorMessages } from './ValidationErrorMessages';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// jest.mock('react-i18next', () => ({
//     useTranslation: () => ({
//         t: (key: string) => key, // Simply return the key for the translation
//     }),
// }));

export default {
    title: 'shared/common/ValidationErrorMessages',
    component: ValidationErrorMessages,
    argTypes: {
        isDirty: { control: 'boolean' },
        value: { control: 'text' },
        validations: { control: 'object' },
        errors: { control: 'object' },
    },
} as ComponentMeta<typeof ValidationErrorMessages>;

const Template: ComponentStory<typeof ValidationErrorMessages> = (args) => (
    <ValidationErrorMessages {...args} />
);

export const Default = Template.bind({});
Default.args = {
    isDirty: true,
    errors: {
        isEmpty: true,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
        usernameError: false,
        isUrlError: false,
    },
};

export const WithMinLengthError = Template.bind({});
WithMinLengthError.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: true,
        maxLengthError: false,
        emailError: false,
        usernameError: false,
        isUrlError: false,
    },
};

export const WithMaxLengthError = Template.bind({});
WithMaxLengthError.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: false,
        maxLengthError: true,
        emailError: false,
        usernameError: false,
        isUrlError: false,
    },
};

export const WithEmailError = Template.bind({});
WithEmailError.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: false,
        maxLengthError: false,
        emailError: true,
        usernameError: false,
        isUrlError: false,
    },
};

export const WithUsernameError = Template.bind({});
WithUsernameError.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
        usernameError: true,
        isUrlError: false,
    },
};

export const WithUrlError = Template.bind({});
WithUrlError.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
        usernameError: false,
        isUrlError: true,
    },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    isDirty: true,
    errors: {
        isEmpty: true,
        minLengthError: false,
        maxLengthError: false,
        emailError: false,
        usernameError: false,
        isUrlError: false,
    },
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const AllErrors = Template.bind({});
AllErrors.args = {
    isDirty: true,
    errors: {
        isEmpty: false,
        minLengthError: true,
        maxLengthError: true,
        emailError: true,
        usernameError: true,
        isUrlError: true,
    },
};
AllErrors.decorators = [NewDesignDecorator];
