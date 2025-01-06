import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// const imageMimeType = /image\/(png|jpg|jpeg)/i;
const imageMimeType = /^image\//i;

interface UseImageUploaderProps {
    initialAvatar: string;
    onFileUpload?: (file: File | null) => void; // Callback to handle uploaded file
    errorMessage: string;
}

interface UseImageUploaderReturn {
    avatarSrc: string;
    imagePreview: string | null;
    error: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    selectedImage: File | null;
}

export const useImageUploader = ({
    initialAvatar,
    onFileUpload,
    errorMessage,
}: UseImageUploaderProps): UseImageUploaderReturn => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>(initialAvatar || '');

    // console.log('in useImageUploader:::: selectedImage', selectedImage);

    useEffect(() => {
        let previewUrl: string | null = null;

        if (selectedImage) {
            previewUrl = window.URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);
            setAvatarSrc(previewUrl);
            // onFileUpload(selectedImage);
        }

        return () => {
            if (previewUrl) {
                window.URL.revokeObjectURL(previewUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);

    const resetImage = useCallback(() => {
        setSelectedImage(null);
        setImagePreview(null);
        setAvatarSrc('');
        onFileUpload?.(null);
    }, [onFileUpload]);

    const handleImageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            // console.log('event.target.files', event.target.files);
            const file = event.target.files?.[0];
            if (!file) return;

            if (!file.type.match(imageMimeType)) {
                setError(errorMessage);
                resetImage();
                return;
            }

            setError(null);
            setSelectedImage(file);
        },
        [errorMessage, resetImage],
    );

    return {
        avatarSrc,
        imagePreview,
        error,
        handleImageChange,
        resetImage,
        selectedImage,
    };
};
