import { useLocation } from 'react-router-dom';

export const useIsEditHRInterviewAnswerPage = (): boolean => {
    const location = useLocation();
    const isEditHRInterviewAnswerPage = /^\/hr-interview-qa\/[^/]+\/edit$/.test(
        location.pathname,
    );

    return isEditHRInterviewAnswerPage;
};
