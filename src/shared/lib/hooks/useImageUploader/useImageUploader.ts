import { ChangeEvent, useEffect, useState } from 'react';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface UseImageUploaderProps {
    initialAvatar: string;
    onFileUpload: (file: File | null) => void; // Callback to handle uploaded file
    errorMessage: string;
}

export const useImageUploader = ({
    initialAvatar,
    onFileUpload,
    errorMessage,
}: UseImageUploaderProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>(initialAvatar || '');

    useEffect(() => {
        let previewUrl: string | null = null;

        if (selectedImage) {
            previewUrl = window.URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);
            setAvatarSrc(previewUrl);
            onFileUpload(selectedImage);
        }

        return () => {
            if (previewUrl) {
                window.URL.revokeObjectURL(previewUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);

    const resetImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setAvatarSrc('');
        onFileUpload(null);
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.match(imageMimeType)) {
            setError(errorMessage);
            resetImage();
            return;
        }

        setError(null);
        setSelectedImage(file);
    };

    return {
        avatarSrc,
        imagePreview,
        error,
        handleImageChange,
        resetImage,
    };
};
