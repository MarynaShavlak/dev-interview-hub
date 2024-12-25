import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ImageBlockEditor.module.scss';
import UploadIcon from '@/shared/assets/icons/upload.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box/Box';
import {
    ArticleImageBlock,
    ArticleImageBlockComponent,
    ArticleSection,
} from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { Input } from '@/shared/ui/redesigned/Input';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

import { useImageBlockActions } from '../../lib/hooks/useImageBlockActions/useImageBlockActions';
import { BlockActionButtonList } from '../BlockActionButtonList/BlockActionButtonList';

interface ImageBlockEditorProps {
    // avatar: string;
    // blockId: string;
    onFileUpload: (file: File | null) => void;
    block: ArticleImageBlock;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const ImageBlockEditor = (props: ImageBlockEditorProps) => {
    const {
        // avatar,
        // blockId,
        block,
        addBlockInArticle,
        deleteBlockFromArticle,

        onEditBlock,
        onFileUpload,
    } = props;
    const { t } = useTranslation('profile');
    const errorMessage = t('Некоректний тип файлу');
    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    //
    // const dispatch = useAppDispatch();
    // // const { hasErrors, onChangeAvatar } = useProfile();
    //
    // const uploadedArticleImage = useUploadedArticleImage();
    // console.log('uploadedArticleImage', uploadedArticleImage);
    // const onSave = useCallback(async () => {
    //     // console.log('profileData', profileData);
    //     // console.log('formData', formData);
    //     console.log('uploadedArticleImage', uploadedArticleImage);
    //     if (uploadedArticleImage) {
    //         const url = await dispatch(
    //             uploadImageThunk(uploadedArticleImage),
    //         ).unwrap();
    //         // onChangeAvatar(url);
    //     }
    //     if (uploadedArticleImage == null) {
    //         // onChangeAvatar('');
    //     }
    // }, [dispatch, uploadedArticleImage]);

    const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: block.src,
            onFileUpload,
            errorMessage,
        });
    const isEmptyContent = imagePreview?.length === 0;

    const { saveImageBlock, deleteImageBlock } = useImageBlockActions({
        blockId: block.id,
        title,
        src: block.src,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const handleSaveImageBlock = useCallback(() => {
        saveImageBlock();
        toggleBlockSaveState();
    }, [saveImageBlock, toggleBlockSaveState]);

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
                <HStack gap="16" align="end">
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
                                                    {t(
                                                        'Завантажити зображення',
                                                    )}
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
                    <BlockActionButtonList
                        saveBlock={handleSaveImageBlock}
                        deleteBlock={deleteImageBlock}
                        isSaveDisabled={isEmptyContent}
                    />
                </HStack>
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
