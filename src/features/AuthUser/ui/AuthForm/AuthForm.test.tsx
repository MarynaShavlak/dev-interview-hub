import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AuthForm from './AuthForm';
import { setFeatureFlags } from '@/shared/lib/features';
import { loginReducer } from '../../model/slices/loginSlice/loginSlice';

const options = {
    asyncReducers: {
        loginForm: loginReducer,
    },
};

const correctEmail = 'correctEmail@gmail.com';
const correctPassword = 'correctPassword';

describe('LoginForm Component', () => {
    beforeEach(() => {
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
            'wrongEmail@gmail.com',
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

    test('should display an error message when the username is empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-password-input'),
            correctPassword,
        );
        expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    });

    test('should display an error message when the password is empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        await userEvent.type(
            screen.getByTestId('login-email-input'),
            correctEmail,
        );
        expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    });

    test('should display errors when both username and password are empty.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);
        expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    });

    test('should clear error message and update fields when retrying after a failed login attempt.', async () => {
        const onSuccessMock = jest.fn();
        componentRender(<AuthForm onSuccess={onSuccessMock} />, options);

        // Trigger a failed login attempt
        await userEvent.type(
            screen.getByTestId('login-email-input'),
            'wrongEmail@gmail.com',
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

        const emailInput = screen.getByTestId('login-email-input');
        const passwordInput = screen.getByTestId('login-password-input');

        await userEvent.clear(emailInput);
        await userEvent.clear(passwordInput);
        await userEvent.type(emailInput, correctEmail);
        await userEvent.type(passwordInput, correctPassword);

        expect(emailInput).toHaveValue(correctEmail);
        expect(passwordInput).toHaveValue(correctPassword);
        expect(
            screen.queryByText('Ви ввели невірний логін або пароль'),
        ).not.toBeInTheDocument();
    });
});
