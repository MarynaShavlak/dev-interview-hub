import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { getRouteHRInterviewAnswerEdit } from '@/shared/const/router/router';

export const useEditHRInterviewQANavigation = () => {
    const navigate = useNavigate();

    const navigateToEditHRInterviewQA = useCallback(
        (articleId: string) => {
            navigate(getRouteHRInterviewAnswerEdit(articleId));
        },
        [navigate],
    );

    return { navigateToEditHRInterviewQA };
};
