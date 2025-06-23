import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLiveCodeDataByIdQuery, LiveCode } from '@/entities/LiveCode';

export const useLiveCodeData = (id: string | undefined) => {
    const dispatch = useAppDispatch();
    const [liveCodeData, setLiveCodeData] = useState<LiveCode | undefined>(
        undefined,
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        dispatch(getLiveCodeDataByIdQuery(id))
            .unwrap()
            .then(setLiveCodeData)
            .catch(() => setLiveCodeData(undefined))
            .finally(() => setIsLoading(false));
    }, [id, dispatch]);

    return { liveCodeData, isLoading };
};
