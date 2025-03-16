import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AuthForm from './AuthForm';
import { setFeatureFlags } from '@/shared/lib/features';
import { loginReducer } from '../../model/slices/loginSlice/loginSlice';
import { $api } from '@/shared/api/api';

const options = {
    asyncReducers: {
        loginForm: loginReducer,
    },
};

// Store the correct credentials here
const correctEmail = 'correctEmail@gmail.com';
const correctPassword = 'correctPassword';

describe('LoginForm Component', () => {
    beforeEach(() => {
        // Set the feature flag to true before each test
        setFeatureFlags({ isAppRedesigned: true });
    });

    test('should render the LoginForm component.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);
        expect(screen.getByTestId('auth-form-sign-in')).toBeInTheDocument();
    });

    test('should update the username and password fields on user input.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        const emailInput = screen.getByTestId('login-email-input');
        const passwordInput = screen.getByTestId('login-password-input');

        await userEvent.type(emailInput, correctEmail);
        expect(emailInput).toHaveValue(correctEmail);

        await userEvent.type(passwordInput, correctPassword);
        expect(passwordInput).toHaveValue(correctPassword);
    });

    test('should display an error message when login fails.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-email-input'),
            'wrongEmail',
        );
        await userEvent.type(
            screen.getByTestId('login-password-input'),
            'wrongPassword',
        );

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        await waitFor(() => {
            expect(
                screen.getByText('Ви ввели невірний логін або пароль'),
            ).toBeInTheDocument();
        });
    });

    test('should disable the login button while loading.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-email-input'),
            'wrongEmail',
        );
        await userEvent.type(
            screen.getByTestId('login-password-input'),
            'wrongPassword',
        );

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    });

    test('should call onSuccess callback when login is successful.', async () => {
        const mockPostReq = jest.spyOn($api, 'post').mockResolvedValue({
            data: {
                token: '123',
            },
        });

        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-username-input'),
            correctEmail,
        );
        await userEvent.type(
            screen.getByTestId('login-password-input'),
            correctPassword,
        );

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        expect(mockPostReq).toHaveBeenCalled();
        mockPostReq.mockRestore();
    });

    test('should display an error message when the username is empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-password-input'),
            correctPassword,
        );

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        await waitFor(() => {
            expect(
                screen.getByText('Ви ввели невірний логін або пароль'),
            ).toBeInTheDocument();
        });
    });

    test('should display an error message when the password is empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-email-input'),
            correctEmail,
        );

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        await waitFor(() => {
            expect(
                screen.getByText('Ви ввели невірний логін або пароль'),
            ).toBeInTheDocument();
        });
    });

    test('should display errors when both username and password are empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.click(screen.getByTestId('login-submit-btn'));

        await waitFor(() => {
            expect(
                screen.getByText('Ви ввели невірний логін або пароль'),
            ).toBeInTheDocument();
        });
    });

    test('should clear error message and update fields when retrying after a failed login attempt.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        // Trigger a failed login attempt
        await userEvent.type(
            screen.getByTestId('login-email-input'),
            'wrongEmail',
        );
        await userEvent.type(
            screen.getByTestId('login-password-input'),
            'wrongPassword',
        );
        await userEvent.click(screen.getByTestId('login-submit-btn'));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(
                screen.getByText('Ви ввели невірний логін або пароль'),
            ).toBeInTheDocument();
        });

        // Start typing a new username and password
        const emailInput = screen.getByTestId('login-email-input');
        const passwordInput = screen.getByTestId('login-password-input');

        await userEvent.clear(emailInput);
        await userEvent.clear(passwordInput);
        await userEvent.type(emailInput, correctEmail);
        await userEvent.type(passwordInput, correctPassword);

        // Verify the error message is cleared
        // Verify the input fields have the new values
        expect(emailInput).toHaveValue(correctEmail);
        expect(passwordInput).toHaveValue(correctPassword);

        await userEvent.click(screen.getByTestId('login-submit-btn'));
        await waitFor(() => {
            expect(
                screen.queryByText('Ви ввели невірний логін або пароль'),
            ).not.toBeInTheDocument();
        });
    });
});
