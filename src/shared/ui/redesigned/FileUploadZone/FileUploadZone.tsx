import React, { ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '../../common/Stack';
import { Box } from '../../common/Box/Box';
import { Card } from '../Card';
import cls from './FileUploadZone.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { FileUploadInput } from '../FileUploadInput/FileUploadInput';
import { Icon } from '../Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import UploadIcon from '@/shared/assets/icons/upload.svg';

interface FileUploadZoneProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;

    className?: string;
}

export const FileUploadZone = (props: FileUploadZoneProps) => {
    const {
        imagePreview,
        handleImageChange,
        resetImage,

        className,
    } = props;
    const { t } = useTranslation('profile');

    const uploadZoneClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });
    const previewWrapClass = imagePreview ? cls.previewWrap : '';

    const uploadButtonFlexClasses = getFlexClasses({
        hStack: true,
        align: 'center',
        justify: 'center',
        gap: '4',
    });

    const renderUploadButton = (icon: ReactNode, text: string) => (
        <span
            className={classNames(
                cls.uploadZoneBtn,
                {},
                uploadButtonFlexClasses,
            )}
        >
            {icon}
            {text}
        </span>
    );

    const icon = imagePreview ? (
        <Icon Svg={EditIcon} width={16} height={16} />
    ) : (
        <Icon Svg={UploadIcon} width={16} height={16} />
    );
    const text = imagePreview
        ? t('Змінити зображення')
        : t('Завантажити зображення');

    return (
        <Box className={cls.avatarWrap}>
            <VStack gap="16" align="center" className={previewWrapClass}>
                {imagePreview ? (
                    <div className={cls.uploadZoneBtnWrap}>
                        <FileUploadInput
                            onChange={handleImageChange}
                            AddFileElement={renderUploadButton(icon, text)}
                        />
                    </div>
                ) : (
                    <Card
                        className={classNames(
                            cls.uploadZone,
                            {},
                            uploadZoneClasses,
                        )}
                    >
                        <FileUploadInput
                            onChange={handleImageChange}
                            AddFileElement={renderUploadButton(icon, text)}
                        />
                    </Card>
                )}
            </VStack>
        </Box>
    );
};
