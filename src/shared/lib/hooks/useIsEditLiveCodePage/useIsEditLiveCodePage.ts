import { useLocation } from 'react-router-dom';

export const useIsEditLiveCodePage = (): boolean => {
    const location = useLocation();
    const isEditLiveCodePage = /^\/live-code-task\/[^/]+\/edit$/.test(
        location.pathname,
    );

    return isEditLiveCodePage;
};
