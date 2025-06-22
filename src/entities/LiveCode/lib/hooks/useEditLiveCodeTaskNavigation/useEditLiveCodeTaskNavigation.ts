import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteLiveCodeTaskEdit } from '@/shared/const/router/router';

export const useEditLiveCodeTaskNavigation = () => {
    const navigate = useNavigate();

    const navigateToEditLiveCodeTask = useCallback(
        (id: string) => {
            navigate(getRouteLiveCodeTaskEdit(id));
        },
        [navigate],
    );

    return { navigateToEditLiveCodeTask };
};
