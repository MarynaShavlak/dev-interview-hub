import React, { ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';
import cls from './FileUploadZone.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { FileUploadInput } from '../../common/FileUploadInput/FileUploadInput';
import { Icon } from '../Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import UploadIcon from '@/shared/assets/icons/upload.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { toggleFeatures } from '@/shared/lib/features';

interface FileUploadZoneProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    className?: string;
}

export const FileUploadZone = (props: FileUploadZoneProps) => {
    const { imagePreview, handleImageChange, resetImage, className } = props;
    const { t } = useTranslation('profile');
    const btnDesignClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.btnDeprecated,
        on: () => cls.btnRedesigned,
    });

    const zoneDesignClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.zoneDeprecated,
        on: () => cls.zoneRedesigned,
    });

    const resetIconDesignClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.resetDeprecated,
        on: () => cls.resetRedesigned,
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

    const renderUploadButton = (icon: ReactNode, text: string) => (
        <span
            className={classNames(cls.uploadZoneBtn, {}, [
                ...uploadButtonFlexClasses,
                btnDesignClass,
            ])}
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
                    <Icon
                        Svg={CloseIcon}
                        className={classNames(cls.resetImageIcon, {}, [
                            resetIconDesignClass,
                        ])}
                        clickable
                        onClick={resetImage}
                    />
                </div>
            ) : (
                <Card
                    className={classNames(zoneDesignClass, {}, [
                        ...uploadZoneClasses,
                        className,
                    ])}
                    max
                >
                    <FileUploadInput
                        onChange={handleImageChange}
                        AddFileElement={renderUploadButton(icon, text)}
                    />
                </Card>
            )}
        </>
    );
};
