import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './Rating';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { RatingRedesigned } from './RatingRedesigned/RatingRedesigned';
import { setFeatureFlags } from '@/shared/lib/features';

describe('Rating Component', () => {
    const renderRedesignedRating = (starsCount: number) => {
        componentRender(
            <RatingRedesigned
                starsCount={starsCount}
                feedbackContainer={<div />}
                onSelect={jest.fn()}
                title="Оцініть статтю"
            />,
        );
    };
    beforeEach(() => {
        // Set the feature flag to true before each test
        setFeatureFlags({ isAppRedesigned: true });
    });

    test('should render the Rating component with a title', () => {
        componentRender(<Rating title="Оцініть статтю" />);
        expect(screen.getByText('Оцініть статтю')).toBeInTheDocument();
    });

    test('should display "Дякуємо за оцінку!" when starsCount is greater than zero', () => {
        renderRedesignedRating(3);
        expect(screen.getByText('Дякуємо за оцінку!')).toBeInTheDocument();
    });

    test('should display the title when starsCount is zero', () => {
        renderRedesignedRating(0);
        expect(
            screen.queryByText('Дякуємо за оцінку!'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Оцініть статтю')).toBeInTheDocument();
    });

    test('does NOT open feedback modal when feedback is disabled', async () => {
        const onSubmitRatingMock = jest.fn();

        componentRender(
            <Rating onSubmitRating={onSubmitRatingMock} hasFeedback />,
        );

        const starButton = screen.getByTestId('StarRating-4');
        fireEvent.click(starButton);

        await waitFor(() => {
            expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
        });
    });

    test('opens feedback modal when feedback is enable', async () => {
        const onSubmitRatingMock = jest.fn();

        componentRender(
            <Rating onSubmitRating={onSubmitRatingMock} hasFeedback={false} />,
        );
        const starButton = screen.getByTestId('StarRating-4');
        fireEvent.click(starButton);
        await waitFor(() => {
            expect(
                screen.queryByTestId('feedback-modal'),
            ).not.toBeInTheDocument();
        });
    });

    test('closes feedback modal without submitting feedback', async () => {
        const onSubmitRatingMock = jest.fn();
        const onSubmitFeedbackMock = jest.fn();
        componentRender(
            <Rating onSubmitRating={onSubmitRatingMock} hasFeedback />,
        );

        const starButton = screen.getByTestId('StarRating-4');
        fireEvent.click(starButton);

        await waitFor(() => {
            expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
        });

        const cancelButton = screen.getByTestId('cancel-feedback-btn');
        await userEvent.click(cancelButton);
        expect(onSubmitRatingMock).toHaveBeenCalledWith(4);
        expect(onSubmitFeedbackMock).not.toHaveBeenCalled();
    });

    test('submits feedback and closes the modal', async () => {
        const onSubmitRatingMock = jest.fn();
        const onSubmitFeedbackMock = jest.fn();
        componentRender(
            <Rating
                onSubmitRating={onSubmitRatingMock}
                onSubmitFeedback={onSubmitFeedbackMock}
                hasFeedback
            />,
        );

        const starButton = screen.getByTestId('StarRating-5');
        fireEvent.click(starButton);

        await waitFor(() => {
            expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
        });

        await userEvent.type(
            screen.getByTestId('feedback-input'),
            'Great Article!',
        );
        expect(screen.getByTestId('feedback-input')).toHaveValue(
            'Great Article!',
        );

        const submitButton = screen.getByTestId('submit-feedback-btn');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(onSubmitFeedbackMock).toHaveBeenCalledWith(
                5,
                'Great Article!',
            );
            expect(onSubmitRatingMock).not.toHaveBeenCalled();
        });
    });
});
