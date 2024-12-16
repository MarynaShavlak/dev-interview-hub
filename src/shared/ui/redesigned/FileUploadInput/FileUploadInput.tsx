import { ChangeEvent } from 'react';
import cls from './FileUploadInput.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Box } from '@/shared/ui/common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

interface FileUploadInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadInput = ({ onChange }: FileUploadInputProps) => {
    const uploadLabelClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });
    return (
        <Box className={cls.uploadFileWrapper}>
            <label
                htmlFor="file-input"
                className={classNames(cls.uploadLabel, {}, uploadLabelClasses)}
            >
                <Icon
                    Svg={EditIcon}
                    className={cls.photoIcon}
                    width={18}
                    height={18}
                />
            </label>
            <input
                type="file"
                id="file-input"
                className={cls.uploadInput}
                accept="image/*"
                onChange={onChange}
            />
        </Box>
    );
};
