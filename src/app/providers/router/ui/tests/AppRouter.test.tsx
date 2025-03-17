import { screen, waitFor } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from '../AppRouter/AppRouter';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteProfile,
} from '@/shared/const/router/router';
import { UserRole } from '@/entities/User';

describe('AppRouter Component', () => {
    test('should render the About page correctly', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('should render the Not Found page for an invalid route', async () => {
        componentRender(<AppRouter />, {
            route: '/asfasfasfasf',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('should redirect an unauthorized user to the Main page', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('should allow access to Profile page for an authorized user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { _inited: true, authData: { id: '1' } },
            },
        });
        await waitFor(
            () => {
                const page = screen.getByTestId('ProfilePage');
                expect(page).toBeInTheDocument();
            },
            { timeout: 3000 },
        );
    });

    test('should deny access to the Admin page when the user lacks the required role)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: {} },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('should allow access to the Admin page when the user has the required role', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        await waitFor(
            () => {
                const page = screen.getByTestId('AdminPanelPage');
                expect(page).toBeInTheDocument();
            },
            { timeout: 1000 },
        );
    });
});
