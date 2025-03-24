import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { NotificationButton } from '../NotificationButton/NotificationButton';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { userReducer } from '@/entities/User';

interface ViewProps {
    children: ReactNode;
}

jest.mock('react-device-detect', () => ({
    BrowserView: ({ children }: ViewProps) => children,
    MobileView: ({ children }: ViewProps) => children,
}));
const initialState = {
    user: {
        authData: { id: '123' }, // Mock user with an id
    },
};

const options = {
    initialState,
    asyncReducers: {
        user: userReducer,
    },
};

describe('NotificationButton Component', () => {
    test('should render the NotificationButton component', () => {
        componentRender(<NotificationButton />, options);
        expect(screen.getByTestId('notification-button')).toBeInTheDocument();
    });

    test('should open the drawer on button click (MobileView)', async () => {
        componentRender(<NotificationButton />, options);
        const triggerButton = screen.getByTestId(
            'notifications-trigger-btn-mobile',
        );
        await act(async () => {
            fireEvent.click(triggerButton);
        });

        // fireEvent.click(triggerButton);
        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-drawer'),
            ).toBeInTheDocument();
        });
    });

    test('should open the popover on button click (BrowserView)', async () => {
        componentRender(<NotificationButton />, options);
        const triggerButton = screen.getByTestId(
            'notifications-trigger-btn-desktop',
        );

        fireEvent.click(triggerButton);
        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-popover'),
            ).toBeInTheDocument();
        });
    });

    test('should close the drawer when overlay is clicked', async () => {
        componentRender(<NotificationButton />, options);
        const triggerButton = screen.getByTestId(
            'notifications-trigger-btn-mobile',
        );
        fireEvent.click(triggerButton);

        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-drawer'),
            ).toBeInTheDocument();
        });

        const drawerOverlay = screen.getByTestId('drawer-overlay');
        fireEvent.click(drawerOverlay);

        await waitFor(() => {
            expect(
                screen.queryByTestId('notifications-drawer'),
            ).not.toBeInTheDocument();
        });
    });

    test('should toggle drawer state multiple times', async () => {
        componentRender(<NotificationButton />, options);
        const triggerButton = screen.getByTestId(
            'notifications-trigger-btn-mobile',
        );

        // Open the drawer
        fireEvent.click(triggerButton);
        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-drawer'),
            ).toBeInTheDocument();
        });

        // Close the drawer
        const drawerOverlay = screen.getByTestId('drawer-overlay');
        fireEvent.click(drawerOverlay);
        await waitFor(
            () => {
                expect(
                    screen.queryByTestId('notifications-drawer'),
                ).not.toBeInTheDocument();
            },
            { timeout: 2000 },
        );

        // Open the drawer again
        fireEvent.click(triggerButton);
        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-drawer'),
            ).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByTestId('drawer-overlay')).toBeInTheDocument();
        });

        // Close the drawer again
        const newDrawerOverlay = screen.getByTestId('drawer-overlay');
        fireEvent.click(newDrawerOverlay);

        await waitFor(
            () => {
                expect(
                    screen.queryByTestId('notifications-drawer'),
                ).not.toBeInTheDocument();
            },
            { timeout: 2000 },
        );
    });
});
