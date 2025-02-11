import { useCallback } from 'react';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteArticleImageThunk } from '@/entities/Article';

export const useAvatarUploader = (
    avatar: string,
    onFileUpload: (file: File | null) => void,
) => {
    const dispatch = useAppDispatch();

    const deleteFromStorage = useCallback(async () => {
        if (avatar) {
            await dispatch(deleteArticleImageThunk(avatar)).unwrap();
        }
    }, [dispatch, avatar]);

    const { avatarSrc, preview, fileTypeError, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: avatar,
            onFileUpload,
            deleteFromStorage,
        });

    return {
        avatarSrc,
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
    };
};
