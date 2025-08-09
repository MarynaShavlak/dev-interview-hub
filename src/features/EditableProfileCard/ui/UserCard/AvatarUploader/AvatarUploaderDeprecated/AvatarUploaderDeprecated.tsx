import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import cls from '../../UserCard.module.scss';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { Box } from '@/shared/ui/common/Box/Box';
import { AvatarUploaderProps } from '../AvatarUploader';
import { useAvatarUploader } from '../../../../lib/hooks/useAvatarUploader/useAvatarUploader';
import { FileUploadInput } from '@/shared/ui/common/FileUploadInput/FileUploadInput';

export const AvatarUploaderDeprecated = ({
    avatar,
    readonly,
    onFileUpload,
}: AvatarUploaderProps) => {
    const { t } = useTranslation('profile');
    const avatarTextPlaceholder = t('Аватар користувача');
    const { avatarSrc, preview, fileTypeError, handleImageChange, resetImage } =
        useAvatarUploader(avatar, onFileUpload);

    return (
        <VStack justify="center" align="center" max>
            {readonly && (
                <Avatar
                    size={isMobile ? 100 : 128}
                    src={avatar}
                    alt={avatarTextPlaceholder}
                />
            )}
            {!readonly && (
                <VStack gap="4" align="center">
                    <Box className={cls.avatarWrap}>
                        {preview && (
                            <Avatar
                                size={isMobile ? 100 : 128}
                                src={preview}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        {!preview && (
                            <Avatar
                                size={isMobile ? 100 : 128}
                                src={avatarSrc}
                                alt={avatarTextPlaceholder}
                                data-testid="UserCard.avatar"
                            />
                        )}

                        <FileUploadInput onChange={handleImageChange} />
                    </Box>
                    <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={resetImage}
                        size={ButtonSize.S}
                    >
                        {t('Видалити зображення')}
                    </Button>
                    {fileTypeError && (
                        <Text text={fileTypeError} theme={TextTheme.ERROR} />
                    )}
                </VStack>
            )}
        </VStack>
    );
};
