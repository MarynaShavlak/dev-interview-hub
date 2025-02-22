// index.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import registerServiceWorker from '../config/serviceWorker/serviceWorkerRegistration';

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <ForceUpdateProvider>
                        <ThemeProvider>
                            <App />
                        </ThemeProvider>
                    </ForceUpdateProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'The root container was not found. FAILED to mount the react application',
    );
}

const root = createRoot(container);

root.render(<AppWrapper />);
registerServiceWorker();
