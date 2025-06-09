import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getHRInterviewQADataByIdQuery,
    HRInterviewQA,
} from '@/entities/HRInterviewQA';

export const useHRInterviewQAData = (id: string | undefined) => {
    const dispatch = useAppDispatch();
    const [hrInterviewData, setHRInterviewData] = useState<
        HRInterviewQA | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        dispatch(getHRInterviewQADataByIdQuery(id))
            .unwrap()
            .then(setHRInterviewData)
            .catch(() => setHRInterviewData(undefined))
            .finally(() => setIsLoading(false));
    }, [id, dispatch]);

    return { hrInterviewData, isLoading };
};
