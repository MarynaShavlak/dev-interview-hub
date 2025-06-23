import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteLiveCodeTaskDetails } from '@/shared/const/router/router';

export const useLiveCodeTaskNavigation = () => {
    const navigate = useNavigate();

    const navigateToLiveCodeTask = useCallback(
        (taskId: string) => {
            navigate(getRouteLiveCodeTaskDetails(taskId));
        },
        [navigate],
    );

    return { navigateToLiveCodeTask };
};
