import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';
import { testUserData } from '@/entities/User/testing';
import { updateUserDataMutation } from '@/entities/User';

jest.mock('@/entities/User/api/userApi.ts', () => ({
    ...jest.requireActual('@/entities/User/api/userApi.ts'),
    updateUserDataMutation: jest.fn(),
}));

jest.mock('@/entities/User', () => {
    const actual = jest.requireActual('@/entities/User');
    return {
        ...actual,
        useGetUserRoles: jest.fn(() => ({ isAdmin: true })),
        useUserAuthData: jest.fn(() => ({ id: '1', username: 'testUsername' })),
    };
});

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: testUserData,
            form: testUserData,
        },
        user: {
            authData: { id: '1', username: 'testUsername' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('EditableProfileCard Component', () => {
    const mockUpdateUserDataMutation = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue(testUserData),
    });

    beforeEach(() => {
        jest.clearAllMocks();
        (updateUserDataMutation as jest.Mock).mockReturnValue(
            mockUpdateUserDataMutation,
        );
    });

    test('should switch to edit mode and display the Cancel button.', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );
        expect(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        ).toBeInTheDocument();
    });

    test('should reset values to original when canceled after editing.', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('UserCard.firstname'));
        await userEvent.clear(screen.getByTestId('UserCard.lastname'));

        await userEvent.type(screen.getByTestId('UserCard.firstname'), 'name1');
        await userEvent.type(
            screen.getByTestId('UserCard.lastname'),
            'lastname1',
        );

        expect(screen.getByTestId('UserCard.firstname')).toHaveValue('name1');
        expect(screen.getByTestId('UserCard.lastname')).toHaveValue(
            'lastname1',
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        );

        expect(screen.getByTestId('UserCard.firstname')).toHaveValue(
            testUserData.firstname,
        );
        expect(screen.getByTestId('UserCard.lastname')).toHaveValue(
            testUserData.lastname,
        );
    });

    test('should disable save button when form validation fails', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('UserCard.firstname'));
        const saveButton = screen.getByTestId(
            'EditableProfileCardHeader.SaveButton',
        );
        expect(saveButton).toHaveAttribute('disabled');
    });

    test('should successfully call update mutation after save button click', async () => {
        // Render component
        componentRender(<EditableProfileCard id="1" />, options);

        // Enter edit mode
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        // Modify form data
        await userEvent.clear(screen.getByTestId('UserCard.firstname'));
        await userEvent.type(
            screen.getByTestId('UserCard.firstname'),
            'UpdatedName',
        );

        // Click save button
        const saveButton = screen.getByTestId(
            'EditableProfileCardHeader.SaveButton',
        );
        await userEvent.click(saveButton);

        // Wait for and verify mutation call
        await waitFor(() => {
            expect(mockUpdateUserDataMutation).toHaveBeenCalledWith({
                userId: '1',
                updates: expect.objectContaining({
                    firstname: 'UpdatedName',
                    id: '1',
                }),
            });
        });

        // Verify component returns to readonly mode
        expect(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId('EditableProfileCardHeader.CancelButton'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('EditableProfileCardHeader.SaveButton'),
        ).not.toBeInTheDocument();
    });
});
