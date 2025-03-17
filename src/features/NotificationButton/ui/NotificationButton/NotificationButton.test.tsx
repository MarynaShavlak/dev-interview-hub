import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { NotificationButton } from '../NotificationButton/NotificationButton';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

interface ViewProps {
    children: ReactNode;
}

jest.mock('react-device-detect', () => ({
    BrowserView: ({ children }: ViewProps) => children,
    MobileView: ({ children }: ViewProps) => children,
}));

jest.mock('@/entities/User', () => ({
    useUserAuthData: jest.fn().mockReturnValue({ id: 'test-user-id' }),
}));

describe('NotificationButton Component', () => {
    test('should render the NotificationButton component', () => {
        componentRender(<NotificationButton />);
        expect(screen.getByTestId('notification-button')).toBeInTheDocument();
    });

    test('should open the drawer on button click (MobileView)', async () => {
        componentRender(<NotificationButton />);
        const triggerButton = screen.getByTestId(
            'notifications-trigger-btn-mobile',
        );

        fireEvent.click(triggerButton);
        await waitFor(() => {
            expect(
                screen.getByTestId('notifications-drawer'),
            ).toBeInTheDocument();
        });
    });

    test('should open the popover on button click (BrowserView)', async () => {
        componentRender(<NotificationButton />);
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
        componentRender(<NotificationButton />);
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
        componentRender(<NotificationButton />);
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
            { timeout: 1000 },
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
            { timeout: 1000 },
        );
    });
});
