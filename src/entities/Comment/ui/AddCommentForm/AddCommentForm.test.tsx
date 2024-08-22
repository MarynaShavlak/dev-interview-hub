import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AddCommentForm from './AddCommentForm';
import { setFeatureFlags } from '@/shared/lib/features';

import { addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { $api } from '@/shared/api/api';

const options = {
    asyncReducers: {
        addCommentForm: addCommentFormReducer,
    },
};

const correctComment = 'This is a valid comment';

describe('AddCommentForm Component', () => {
    beforeEach(() => {
        // Set the feature flag to true before each test
        setFeatureFlags({ isAppRedesigned: true });
    });

    test('should render the AddCommentForm component.', () => {
        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );
        expect(screen.getByTestId('AddCommentForm')).toBeInTheDocument();
    });

    test('should update the comment text field on user input.', async () => {
        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );

        const commentInput = screen.getByTestId('AddCommentForm.Input');

        await userEvent.type(commentInput, correctComment);
        expect(commentInput).toHaveValue(correctComment);
    });

    test('should call onSendComment callback when comment is sent.', async () => {
        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );

        await userEvent.type(
            screen.getByTestId('AddCommentForm.Input'),
            correctComment,
        );
        await userEvent.click(screen.getByTestId('AddCommentForm.Button'));

        expect(onSendCommentMock).toHaveBeenCalledWith(correctComment);
    });

    test('should clear the comment text field after sending a comment.', async () => {
        jest.spyOn($api, 'post').mockResolvedValueOnce({});

        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );

        const commentInput = screen.getByTestId('AddCommentForm.Input');
        await userEvent.type(commentInput, correctComment);
        await userEvent.click(screen.getByTestId('AddCommentForm.Button'));

        await waitFor(() => {
            expect(commentInput).toHaveValue('');
        });
    });

    test('should disable the send button when the comment input is empty', async () => {
        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );

        const sendButton = screen.getByTestId('AddCommentForm.Button');
        expect(sendButton).toBeDisabled();
    });

    test('should enable the send button when there is text in the comment input', async () => {
        const onSendCommentMock = jest.fn();
        componentRender(
            <AddCommentForm onSendComment={onSendCommentMock} />,
            options,
        );

        const commentInput = screen.getByTestId('AddCommentForm.Input');
        await userEvent.type(commentInput, correctComment);

        const sendButton = screen.getByTestId('AddCommentForm.Button');
        expect(sendButton).not.toBeDisabled();
    });
});
