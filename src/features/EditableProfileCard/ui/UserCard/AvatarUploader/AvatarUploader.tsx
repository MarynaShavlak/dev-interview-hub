import { useTranslation } from 'react-i18next';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import cls from '../UserCard.module.scss';

import { Button } from '@/shared/ui/redesigned/Button';
import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box/Box';

interface ImageUploaderProps {
    avatar: string;
    readonly?: boolean;
    onFileUpload: (file: File | null) => void;
}

export const AvatarUploader = ({
    avatar,
    readonly,
    onFileUpload,
}: ImageUploaderProps) => {
    const { t } = useTranslation('profile');
    const avatarTextPlaceholder = t('Аватар користувача');

    const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: avatar,
            onFileUpload,
        });

    return (
        <VStack justify="center" align="center" max>
            {readonly && (
                <Avatar size={128} src={avatar} alt={avatarTextPlaceholder} />
            )}
            {!readonly && (
                <VStack gap="4" align="center">
                    <Box className={cls.avatarWrap}>
                        {imagePreview && (
                            <Avatar
                                size={128}
                                src={imagePreview}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        {!imagePreview && (
                            <Avatar
                                size={128}
                                src={avatarSrc}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        <FileUploadInput onChange={handleImageChange} />
                    </Box>
                    <Button variant="cancel" onClick={resetImage} size="s">
                        {t('Видалити зображення')}
                    </Button>
                    {error && <Text text={error} variant="error" />}
                </VStack>
            )}
        </VStack>
    );
};
