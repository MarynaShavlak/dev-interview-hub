import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PasswordInput } from './PasswordInput';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/Auth/PasswordInput',
    component: PasswordInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = (args) => {
    const { password } = args;
    const validConfig = useInputValidationConfig();
    const passwordErrors = useInputErrors(password, validConfig.password);
    return (
        <PasswordInput
            {...args}
            validConfig={validConfig}
            passwordErrors={passwordErrors}
        />
    );
};
const normalArgs = {
    password: 'some password',
};

const emptyArgs = {
    password: '',
};

const minLengthArgs = {
    password: '00',
};

const maxLengthArgs = {
    password: '123456789012345678901',
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const EmptyPasswordWithError = Template.bind({});
EmptyPasswordWithError.args = emptyArgs;

export const EmptyPasswordWithErrorRedesigned = Template.bind({});
EmptyPasswordWithErrorRedesigned.args = emptyArgs;
EmptyPasswordWithErrorRedesigned.decorators = [NewDesignDecorator];

export const WithMinLengthError = Template.bind({});
WithMinLengthError.args = minLengthArgs;

export const WithMinLengthErrorRedesigned = Template.bind({});
WithMinLengthErrorRedesigned.args = minLengthArgs;
WithMinLengthErrorRedesigned.decorators = [NewDesignDecorator];

export const WithMaxLengthError = Template.bind({});
WithMaxLengthError.args = maxLengthArgs;

export const WithMaxLengthErrorRedesigned = Template.bind({});
WithMaxLengthErrorRedesigned.args = maxLengthArgs;
WithMaxLengthErrorRedesigned.decorators = [NewDesignDecorator];

export const WithReset = Template.bind({});
WithReset.args = {
    ...normalArgs,
    withResetOption: true,
    onShowResetForm: () => console.log('Reset form clicked'),
};

export const WithResetRedesigned = Template.bind({});
WithResetRedesigned.args = {
    ...normalArgs,
    withResetOption: true,
    onShowResetForm: () => console.log('Reset form clicked'),
};
WithResetRedesigned.decorators = [NewDesignDecorator];
//
// export const WithResetOption = Template.bind({});
// WithResetOption.args = {
//     ...normalArgs,
//     withResetOption: true,
//     onShowResetForm: () => console.log('Redirect to reset password'),
// };
//
// export const WithResetOptionRedesigned = Template.bind({});
// WithResetOptionRedesigned.args = {
//     ...normalArgs,
//     withResetOption: true,
//     onShowResetForm: () => console.log('Redirect to reset password'),
// };
// WithResetOptionRedesigned.decorators = [NewDesignDecorator];
//
// export const WithPasswordErrors = Template.bind({});
// WithPasswordErrors.args = {
//     ...normalArgs,
//     passwordErrors: ['Пароль повинен містити мінімум 6 символів'],
// };
//
// export const WithPasswordErrorsRedesigned = Template.bind({});
// WithPasswordErrorsRedesigned.args = {
//     ...normalArgs,
//     passwordErrors: ['Пароль повинен містити мінімум 6 символів'],
// };
// WithPasswordErrorsRedesigned.decorators = [NewDesignDecorator];
//
// export const PasswordVisible = Template.bind({});
// PasswordVisible.args = {
//     ...normalArgs,
//     password: 'password123',
//     validConfig: { password: { minLength: 6 } },
// };
// PasswordVisible.decorators = [
//     (Story) => {
//         // To simulate password visibility toggle
//         return <Story />;
//     },
// ];
//
// export const PasswordHidden = Template.bind({});
// PasswordHidden.args = {
//     ...normalArgs,
//     password: 'password123',
//     validConfig: { password: { minLength: 6 } },
// };
// PasswordHidden.decorators = [
//     (Story) => {
//         // To simulate password visibility toggle (hidden)
//         return <Story />;
//     },
// ];
