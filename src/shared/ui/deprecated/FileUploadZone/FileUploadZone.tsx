import React, { ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';
import cls from './FileUploadZone.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { FileUploadInput } from '../../common/FileUploadInput/FileUploadInput';
import { Icon } from '../Icon';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Button, ButtonTheme } from '../Button';

interface FileUploadZoneProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    className?: string;
    height?: string;
    width?: string;
}

export const FileUploadZone = (props: FileUploadZoneProps) => {
    const {
        imagePreview,
        handleImageChange,
        resetImage,
        className,
        height = '300px',
        width = '100%',
    } = props;
    const { t } = useTranslation('profile');

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

    const renderUploadButton = (text: string, icon?: ReactNode) => (
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

    const text = imagePreview
        ? t('Змінити зображення')
        : t('Завантажити зображення');

    return imagePreview ? (
        <div className={cls.uploadZoneBtnWrap} style={{ width, height }}>
            <FileUploadInput
                onChange={handleImageChange}
                AddFileElement={renderUploadButton(text)}
            />

            <Button theme={ButtonTheme.CLEAR} onClick={resetImage}>
                <Icon
                    Svg={CloseIcon}
                    className={cls.resetImageIcon}
                    width={32}
                    height={32}
                />
            </Button>
        </div>
    ) : (
        <Card
            className={classNames(cls.uploadZone, {}, [
                ...uploadZoneClasses,
                className,
            ])}
            max
            style={{ width, height }}
        >
            <FileUploadInput
                onChange={handleImageChange}
                AddFileElement={renderUploadButton(text)}
            />
        </Card>
    );
};
