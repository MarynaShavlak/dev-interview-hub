import { useTranslation } from 'react-i18next';
import React from 'react';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ImageBlockEditor.module.scss';
import UploadIcon from '@/shared/assets/icons/upload.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box/Box';
import { ArticleImageBlockComponent, ArticleSection } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { Input } from '@/shared/ui/redesigned/Input';

interface ImageBlockEditorProps {
    avatar: string;
    onFileUpload: (file: File | null) => void;
}

export const ImageBlockEditor = ({
    avatar,

    onFileUpload,
}: ImageBlockEditorProps) => {
    const { t } = useTranslation('profile');
    const errorMessage = t('Некоректний тип файлу');
    const avatarTextPlaceholder = t('Аватар користувача');
    const { title, handleTitleChange, validConfig } = useBlockTitle();

    const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: avatar,
            onFileUpload,
            errorMessage,
        });

    const uploadZoneClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });

    const uploadButtonFlexClasses = getFlexClasses({
        hStack: true,
        align: 'center',
        justify: 'center',
        gap: '4',
    });

    return (
        <VStack justify="center" align="center" max>
            <VStack gap="16" max>
                <Input
                    value={title}
                    label={t('Назва зображення')}
                    labelBold
                    gap="16"
                    maxWidth={false}
                    className={cls.InputName}
                    onChange={handleTitleChange}
                    validations={validConfig.title}
                    maxLengthIndicator
                    // errors={usernameErrors}
                />
                <VStack gap="4" align="center">
                    <Box className={cls.avatarWrap}>
                        {imagePreview && (
                            <VStack gap="16" align="center">
                                <ArticleImageBlockComponent
                                    block={{
                                        type: ArticleSection.IMAGE,
                                        title,
                                        src: imagePreview,
                                        id: 'hhhh',
                                    }}
                                />
                                <HStack max justify="between">
                                    <FileUploadInput
                                        onChange={handleImageChange}
                                        AddFileElement={
                                            <span
                                                className={classNames(
                                                    cls.uploadZoneBtn,
                                                    {},
                                                    uploadButtonFlexClasses,
                                                )}
                                            >
                                                <Icon
                                                    Svg={EditIcon}
                                                    width={16}
                                                    height={16}
                                                />
                                                {t('Змінити зображення')}
                                            </span>
                                        }
                                    />
                                    <Button
                                        variant="cancel"
                                        onClick={resetImage}
                                        size="s"
                                    >
                                        {t('Видалити зображення')}
                                    </Button>
                                </HStack>
                            </VStack>
                        )}

                        {!imagePreview && (
                            <VStack gap="16" align="center">
                                <Card
                                    className={classNames(
                                        cls.uploadZone,
                                        {},
                                        uploadZoneClasses,
                                    )}
                                >
                                    <FileUploadInput
                                        onChange={handleImageChange}
                                        AddFileElement={
                                            <span
                                                className={classNames(
                                                    cls.uploadZoneBtn,
                                                    {},
                                                    uploadButtonFlexClasses,
                                                )}
                                            >
                                                <Icon
                                                    Svg={UploadIcon}
                                                    width={16}
                                                    height={16}
                                                />
                                                {t('Завантажити зображення')}
                                            </span>
                                        }
                                    />
                                </Card>
                                <Button
                                    variant="cancel"
                                    onClick={resetImage}
                                    size="s"
                                >
                                    {t('Видалити зображення')}
                                </Button>
                            </VStack>
                        )}
                    </Box>

                    {error && <Text text={error} variant="error" />}
                </VStack>
            </VStack>
        </VStack>
    );
};

// import { useTranslation } from 'react-i18next';
// import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
// import { VStack } from '@/shared/ui/common/Stack';
// import { Avatar } from '@/shared/ui/redesigned/Avatar';
// import cls from './ImageBlockEditor.module.scss';
//
// import { Button } from '@/shared/ui/redesigned/Button';
// import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
// import { Text } from '@/shared/ui/redesigned/Text';
// import { Box } from '@/shared/ui/common/Box/Box';
// import { ArticleImageBlockComponent, ArticleSection } from '@/entities/Article';
//
// interface ImageBlockEditorProps {
//     avatar: string;
//     readonly?: boolean;
//     onFileUpload: (file: File | null) => void;
// }
//
// export const ImageBlockEditor = ({
//     avatar,
//     readonly,
//     onFileUpload,
// }: ImageBlockEditorProps) => {
//     const { t } = useTranslation('profile');
//     const errorMessage = t('Некоректний тип файлу');
//     const avatarTextPlaceholder = t('Аватар користувача');
//
//     const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
//         useImageUploader({
//             initialAvatar: avatar,
//             onFileUpload,
//             errorMessage,
//         });
//
//     return (
//         <VStack justify="center" align="center" max>
//             {readonly && (
//                 <Avatar size={128} src={avatar} alt={avatarTextPlaceholder} />
//             )}
//             {!readonly && (
//                 <VStack gap="4" align="center">
//                     <Box className={cls.avatarWrap}>
//                         {imagePreview && (
//                             <ArticleImageBlockComponent
//                                 block={{
//                                     type: ArticleSection.IMAGE,
//                                     title: '222',
//                                     src: imagePreview,
//                                     id: 'hhhh',
//                                 }}
//                             />
//                             // <Avatar
//                             //     size={128}
//                             //     src={imagePreview}
//                             //     alt={avatarTextPlaceholder}
//                             // />
//                         )}
//
//                         {!imagePreview && (
//                             <Avatar
//                                 size={128}
//                                 src={avatarSrc}
//                                 alt={avatarTextPlaceholder}
//                             />
//                         )}
//
//                         <FileUploadInput onChange={handleImageChange} />
//                     </Box>
//                     <Button variant="cancel" onClick={resetImage} size="s">
//                         {t('Видалити зображення')}
//                     </Button>
//                     {error && <Text text={error} variant="error" />}
//                 </VStack>
//             )}
//         </VStack>
//     );
// };
