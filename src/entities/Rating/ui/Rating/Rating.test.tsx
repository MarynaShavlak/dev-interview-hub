import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Rating } from './Rating';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { RedesignedRating } from './RedesignedRating/RedesignedRating';
import { setFeatureFlags } from '@/shared/lib/features';

describe('Rating Component', () => {
    const renderRedesignedRating = (starsCount: number) => {
        componentRender(
            <RedesignedRating
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

    test('should display "Дякуємо за оцінку!" when starsCount exists', () => {
        renderRedesignedRating(3);
        expect(screen.getByText('Дякуємо за оцінку!')).toBeInTheDocument();
    });

    test('should display the title when starsCount does not exist', () => {
        renderRedesignedRating(0);
        expect(
            screen.queryByText('Дякуємо за оцінку!'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Оцініть статтю')).toBeInTheDocument();
    });

    test('should NOT open feedback modal when stars are selected but feedback is disabled', async () => {
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

    test('should open feedback modal when stars are selected and feedback is enabled', async () => {
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

    test('should close the feedback modal without submitting feedback', async () => {
        const onSubmitRatingMock = jest.fn();
        const cancelFeedbackMock = jest.fn();

        componentRender(
            <Rating onSubmitRating={onSubmitRatingMock} hasFeedback />,
        );

        const starButton = screen.getByTestId('StarRating-4'); // Assuming each star button has a test ID
        fireEvent.click(starButton);

        await waitFor(() => {
            expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
        });

        const cancelButton = screen.getByTestId('cancel-feedback-btn'); // Assuming button has a test ID
        fireEvent.click(cancelButton);
        screen.debug();
        expect(onSubmitRatingMock).toHaveBeenCalledWith(4);
        expect(cancelFeedbackMock).toHaveBeenCalled();
        expect(screen.queryByTestId('feedback-modal')).not.toBeInTheDocument();

        // await waitFor(() => {
        //     expect(
        //         screen.queryByTestId('feedback-modal'),
        //     ).not.toBeInTheDocument();
        // });
    });
});

// test('should submit feedback and close modal', async () => {
//     const onSubmitFeedbackMock = jest.fn();
//
//     componentRender(
//         <Rating onSubmitFeedback={onSubmitFeedbackMock} hasFeedback />,
//     );
//
//     const starButton = screen.getByTestId('star-button-5'); // Assuming each star button has a test ID
//     fireEvent.click(starButton);
//
//     await waitFor(() => {
//         expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
//     });
//
//     const feedbackInput = screen.getByTestId('feedback-input'); // Assuming input has a test ID
//     fireEvent.change(feedbackInput, {
//         target: { value: 'Great product!' },
//     });
//
//     const submitButton = screen.getByTestId('submit-feedback-btn'); // Assuming button has a test ID
//     fireEvent.click(submitButton);
//
//     await waitFor(() => {
//         expect(onSubmitFeedbackMock).toHaveBeenCalledWith(
//             5,
//             'Great product!',
//         );
//         expect(
//             screen.queryByTestId('feedback-modal'),
//         ).not.toBeInTheDocument();
//     });
// });
//
