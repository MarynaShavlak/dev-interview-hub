import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteHRInterviewEditor } from '@/shared/const/router/router';

export const useInterviewTableNavigation = () => {
    const navigate = useNavigate();

    const onNavigateToInterviewTable = useCallback(() => {
        navigate(getRouteHRInterviewEditor());
    }, [navigate]);

    return { onNavigateToInterviewTable };
};
