import { ChangeEvent, ReactNode } from 'react';
import { v4 } from 'uuid';
import cls from './FileUploadInput.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '../../redesigned/Icon';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { Box } from '../Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';

interface FileUploadInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    AddFileElement?: ReactNode;
    className?: string;
}

export const FileUploadInput = ({
    onChange,
    AddFileElement,
    className,
}: FileUploadInputProps) => {
    const uploadLabelClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });

    const mainLabelClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.uploadLabel,
        off: () => cls.uploadLabelRedesigned,
    });

    const iconClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.photoIcon,
        off: () => cls.photoIconRedesigned,
    });
    const labelClass = AddFileElement ? '' : mainLabelClass;
    const boxClass = AddFileElement
        ? cls.uploadFileCenteredWrapper
        : cls.uploadFileAbsoluteWrapper;
    const inputId = v4();
    return (
        <Box className={boxClass}>
            <label
                htmlFor={inputId}
                className={classNames(labelClass, {}, uploadLabelClasses)}
            >
                {AddFileElement || (
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={
                            <Icon
                                Svg={EditIcon}
                                className={iconClass}
                                width={18}
                                height={18}
                            />
                        }
                        off={
                            <IconDeprecated
                                Svg={EditIcon}
                                className={iconClass}
                                width={18}
                                height={18}
                            />
                        }
                    />
                )}
            </label>
            <input
                type="file"
                id={inputId}
                className={cls.uploadInput}
                accept="image/*"
                onChange={onChange}
            />
        </Box>
    );
};
