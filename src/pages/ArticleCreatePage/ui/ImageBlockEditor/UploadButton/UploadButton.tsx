import React, { ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import cls from '../ImageBlockEditor.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import UploadIcon from '@/shared/assets/icons/upload.svg';

interface UploadButtonProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = (props: UploadButtonProps) => {
    const { imagePreview, handleImageChange } = props;
    const { t } = useTranslation('profile');

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
        <>
            {imagePreview ? (
                <div className={cls.uploadZoneBtnWrap}>
                    <FileUploadInput
                        onChange={handleImageChange}
                        AddFileElement={renderUploadButton(icon, text)}
                    />
                </div>
            ) : (
                <FileUploadInput
                    onChange={handleImageChange}
                    AddFileElement={renderUploadButton(icon, text)}
                />
            )}
        </>
    );
};
