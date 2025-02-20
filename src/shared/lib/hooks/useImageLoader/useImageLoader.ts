import { useEffect, useState } from 'react';

export const useImageLoader = (src?: string) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!src) {
            setIsLoading(false);
            setImageError(true);
            return;
        }

        const img = new Image();
        img.onload = () => {
            setIsLoading(false);
            setImageError(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setImageError(true);
        };
        img.src = src;
    }, [src]);

    return { isLoading, imageError, setImageError };
};
