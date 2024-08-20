import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button Component', () => {
    test('should render Button with text "TEST"', () => {
        render(<Button>TEST</Button>);
        const buttonElement = screen.getByText('TEST');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.tagName).toBe('BUTTON');
    });

    test('should apply "clear" class when ButtonTheme.CLEAR is used', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        const buttonElement = screen.getByText('TEST');
        expect(buttonElement).toHaveClass('clear');
    });
});
