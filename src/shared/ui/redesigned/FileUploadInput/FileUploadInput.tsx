import { ChangeEvent, ReactNode } from 'react';
import { v4 } from 'uuid';
import cls from './FileUploadInput.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '../Icon';
import { Box } from '../../common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

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
    const labelClass = AddFileElement ? '' : cls.uploadLabel;
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
                    <Icon
                        Svg={EditIcon}
                        className={cls.photoIcon}
                        width={18}
                        height={18}
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
